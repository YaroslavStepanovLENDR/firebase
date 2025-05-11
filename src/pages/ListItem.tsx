import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, MapPin, Tag, Plus, X, Loader2, Calendar, ChevronDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { processImageWithGPT, aggregateGPTResults } from "@/services/openaiService";
import { format } from "date-fns";

const categories = [
  { id: "sport", name: "Sport", color: "bg-green-50" },
  { id: "electronics", name: "Electronics", color: "bg-yellow-50" },
  { id: "tools", name: "Tools", color: "bg-orange-50" },
  { id: "home", name: "Home", color: "bg-red-50" },
  { id: "garden", name: "Garden", color: "bg-emerald-50" },
  { id: "camping", name: "Camping", color: "bg-blue-50" },
  { id: "pets", name: "Pets", color: "bg-purple-50" },
  { id: "party", name: "Party", color: "bg-pink-50" },
  { id: "furniture", name: "Furniture", color: "bg-amber-50" },
  { id: "fashion", name: "Fashion", color: "bg-indigo-50" },
  { id: "costumes", name: "Costumes", color: "bg-violet-50" },
  { id: "other", name: "Other", color: "bg-gray-50" },
];

const ListItem = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [price, setPrice] = useState(15);
  const [securityDeposit, setSecurityDeposit] = useState(price * 5);
  const [condition, setCondition] = useState("used-good");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("Tel Aviv, Israel");
  const [showMap, setShowMap] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [autoApprove, setAutoApprove] = useState(true);
  const [aiResults, setAiResults] = useState<any[]>([]);

  useEffect(() => {
    setSecurityDeposit(price * 5);
  }, [price]);

  const conditions = [
    { id: "brand-new", label: t("condition.brandNew") },
    { id: "used-like-new", label: t("condition.usedLikeNew") },
    { id: "used-good", label: t("condition.usedGood") },
    { id: "used-fair", label: t("condition.usedFair") }
  ];

  const handlePriceChange = (newValue: number[]) => {
    setPrice(newValue[0]);
  };

  const handleSecurityDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurityDeposit(Number(e.target.value));
  };

  const handleLocationClick = () => {
    setShowMap(true);
    toast.info(t("toast.gettingLocation"));
  };

  const handleMapSelection = () => {
    setShowMap(false);
    toast.success(t("toast.locationUpdated"));
  };

  const clearFormFields = () => {
    setTitle("");
    setDescription("");
    setSelectedCategory(null);
    setCondition("used-good");
    setPrice(15);
    setBrand("");
    setAiResults([]);
  };

  const processAIResults = async () => {
    if (aiResults.length === 0) return;
    
    const aggregatedResult = aggregateGPTResults(aiResults);
    
    if (aggregatedResult.title) setTitle(aggregatedResult.title);
    if (aggregatedResult.description) setDescription(aggregatedResult.description);
    if (aggregatedResult.category) setSelectedCategory(aggregatedResult.category.toLowerCase());
    if (aggregatedResult.condition) setCondition(aggregatedResult.condition);
    if (aggregatedResult.price) setPrice(aggregatedResult.price);
    if (aggregatedResult.brand) setBrand(aggregatedResult.brand);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newPhotos = [...photos, file];
      const newPhotoURLs = [...photoURLs, URL.createObjectURL(file)];
      
      setPhotos(newPhotos);
      setPhotoURLs(newPhotoURLs);
      
      setIsProcessingImage(true);
      
      try {
        const result = await processImageWithGPT(file);
        
        if (result) {
          const updatedResults = [...aiResults, result];
          setAiResults(updatedResults);
          
          if (updatedResults.length === 1) {
            if (result.title) setTitle(result.title);
            if (result.description) setDescription(result.description);
            if (result.category) setSelectedCategory(result.category.toLowerCase());
            if (result.condition) setCondition(result.condition);
            if (result.price) setPrice(result.price);
            if (result.brand) setBrand(result.brand);
          } else {
            const aggregatedResult = aggregateGPTResults(updatedResults);
            if (aggregatedResult.title) setTitle(aggregatedResult.title);
            if (aggregatedResult.description) setDescription(aggregatedResult.description);
            if (aggregatedResult.category) setSelectedCategory(aggregatedResult.category.toLowerCase());
            if (aggregatedResult.condition) setCondition(aggregatedResult.condition);
            if (aggregatedResult.price) setPrice(aggregatedResult.price);
            if (aggregatedResult.brand) setBrand(aggregatedResult.brand);
          }
        }
      } finally {
        setIsProcessingImage(false);
      }
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    const newPhotoURLs = [...photoURLs];
    
    URL.revokeObjectURL(newPhotoURLs[index]);
    
    newPhotos.splice(index, 1);
    newPhotoURLs.splice(index, 1);
    
    setPhotos(newPhotos);
    setPhotoURLs(newPhotoURLs);
    
    if (newPhotos.length === 0) {
      clearFormFields();
    } else {
      const newAiResults = [...aiResults];
      newAiResults.splice(index, 1);
      setAiResults(newAiResults);
      
      if (newAiResults.length > 0) {
        const updatedAggregate = aggregateGPTResults(newAiResults);
        
        if (updatedAggregate.title) setTitle(updatedAggregate.title);
        if (updatedAggregate.description) setDescription(updatedAggregate.description);
        if (updatedAggregate.category) setSelectedCategory(updatedAggregate.category.toLowerCase());
        if (updatedAggregate.condition) setCondition(updatedAggregate.condition);
        if (updatedAggregate.price) setPrice(updatedAggregate.price);
        if (updatedAggregate.brand) setBrand(updatedAggregate.brand);
      }
    }
  };

  const handlePreviewListing = () => {
    navigate("/preview-listing");
  };

  const handleDateSelection = (date: Date | undefined) => {
    if (!date) return;
    
    const dateExists = unavailableDates.some(
      (unavailableDate) => unavailableDate.toDateString() === date.toDateString()
    );

    if (dateExists) {
      setUnavailableDates(
        unavailableDates.filter(
          (unavailableDate) => unavailableDate.toDateString() !== date.toDateString()
        )
      );
    } else {
      setUnavailableDates([...unavailableDates, date]);
    }
  };

  const formatDateRange = () => {
    if (unavailableDates.length === 0) return "Select dates";
    
    if (unavailableDates.length === 1) {
      return format(unavailableDates[0], "PPP");
    }
    
    return `${unavailableDates.length} ${t("listItem.datesSelected")}`;
  };

  const getSelectedCategoryName = () => {
    const category = categories.find(c => c.id === selectedCategory);
    return category ? category.name : "Select Category";
  };

  const getSelectedCategoryColor = () => {
    const category = categories.find(c => c.id === selectedCategory);
    return category ? category.color : "bg-gray-100";
  };

  return (
    <div className={`max-w-[420px] mx-auto bg-white min-h-screen ${language === "he" ? "text-right" : "text-left"}`}>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-6">Turn your unused items into cash!</h1>
        
        <div className="space-y-6">
          <div className="mb-6">
            <Label className="block mb-2 font-medium">{t("listItem.photos")}</Label>
            <div className="grid grid-cols-4 gap-2">
              {photoURLs.map((url, index) => (
                <div key={`photo-${index}`} className="aspect-square rounded-md border-2 border-gray-300 relative overflow-hidden">
                  <img src={url} alt={`Uploaded item ${index+1}`} className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-sm"
                  >
                    <X className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
              ))}
              
              {photoURLs.length < 4 && (
                <div className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                    disabled={isProcessingImage}
                  />
                  {isProcessingImage ? (
                    <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
                  ) : (
                    <Camera className="h-6 w-6 text-gray-400" />
                  )}
                </div>
              )}
              
              {[...Array(Math.max(0, 3 - photoURLs.length))].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
              ))}
            </div>
            {isProcessingImage && (
              <p className="mt-2 text-sm text-[rgba(83,177,117,1)]">
                {t("listItem.processingImage")}
              </p>
            )}
          </div>

          <div className="mb-6">
            <Label htmlFor="title" className="block mb-2 font-medium">{t("listItem.itemTitle")}</Label>
            <Input 
              id="title" 
              placeholder={t("listItem.titlePlaceholder")} 
              className="w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <Label htmlFor="brand" className="block mb-2 font-medium">Brand</Label>
            <Input 
              id="brand" 
              placeholder="Enter brand name" 
              className="w-full"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="description" className="block mb-2 font-medium">{t("listItem.description")}</Label>
            <Textarea 
              id="description" 
              placeholder={t("listItem.descriptionPlaceholder")} 
              className="w-full h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="condition" className="block mb-2 font-medium">{t("listItem.condition")}</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger id="condition">
                <SelectValue placeholder={t("listItem.selectCondition")} />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((conditionOption) => (
                  <SelectItem key={conditionOption.id} value={conditionOption.id}>
                    {conditionOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6">
            <Label className="block mb-2 font-medium">{t("listItem.category")}</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`w-full justify-between ${getSelectedCategoryColor()} border border-gray-300`}
                >
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    {getSelectedCategoryName()}
                  </div>
                  <ChevronDown className="h-4 w-4 ml-2 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full max-h-[300px] overflow-y-auto bg-white" align="start">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center ${selectedCategory === category.id ? 'bg-gray-100' : ''}`}
                  >
                    <div className={`w-3 h-3 rounded-full mr-2 ${category.color.replace('bg-', 'bg-')}`}></div>
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mb-6">
            <Label htmlFor="location" className="block mb-2 font-medium">{t("listItem.location")}</Label>
            <div className="relative">
              <MapPin className={`w-5 h-5 absolute ${language === "he" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400`} />
              <Input 
                id="location" 
                placeholder={t("listItem.locationPlaceholder")} 
                className={`${language === "he" ? "pr-10" : "pl-10"} cursor-pointer`}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onClick={handleLocationClick}
                readOnly
              />
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="price" className="block mb-2 font-medium">{t("listItem.pricePerDay")}</Label>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  <span className="text-[rgba(83,177,117,1)] font-medium text-base mr-1.5">$</span>
                  <span className="text-2xl font-bold">{price.toFixed(2)}</span>
                </div>
              </div>
              <Slider 
                id="price-slider"
                defaultValue={[price]} 
                max={100}
                min={1}
                step={1}
                onValueChange={handlePriceChange}
                className="py-4"
              />
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="security-deposit" className="block mb-2 font-medium">{t("listItem.securityDeposit")}</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">$</div>
              <Input 
                id="security-deposit" 
                type="number" 
                value={securityDeposit} 
                onChange={handleSecurityDepositChange}
                className="pl-8"
              />
              <p className="mt-1 text-xs text-gray-500">{t("listItem.securityDepositRecommendation")}</p>
            </div>
          </div>

          <div className="mb-6">
            <Label className="block mb-2 font-medium">Unavailable Dates</Label>
            <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left font-normal border-gray-300"
                  onClick={() => setShowDatePicker(true)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{formatDateRange()}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="multiple"
                  selected={unavailableDates}
                  onSelect={(dates) => {
                    if (dates) {
                      setUnavailableDates(Array.isArray(dates) ? dates : [dates]);
                    } else {
                      setUnavailableDates([]);
                    }
                  }}
                  className="p-3 pointer-events-auto bg-white"
                />
              </PopoverContent>
            </Popover>
            <p className="mt-1 text-xs text-gray-500">
              Select dates when your item will not be available for rent.
            </p>
          </div>

          <div className="mb-6 flex items-start space-x-2">
            <Checkbox 
              id="auto-approve" 
              checked={autoApprove} 
              onCheckedChange={(checked) => setAutoApprove(checked as boolean)}
            />
            <div>
              <Label 
                htmlFor="auto-approve" 
                className="font-medium cursor-pointer"
              >
                Automatically approve rental requests
              </Label>
              <p className="text-xs text-gray-500">
                When enabled, rental requests will be automatically approved when the item is available.
              </p>
            </div>
          </div>

          <Button 
            className="w-full bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.8)]"
            onClick={handlePreviewListing}
            disabled={!title || !description || !selectedCategory || isProcessingImage}
          >
            {isProcessingImage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("listItem.processing")}
              </>
            ) : (
              t("listItem.continue")
            )}
          </Button>
        </div>
      </div>

      <Dialog open={showMap} onOpenChange={setShowMap}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("map.selectLocation")}</DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">{t("common.close")}</span>
            </DialogClose>
          </DialogHeader>
          <div className="h-[300px] bg-gray-100 flex items-center justify-center rounded-md">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-[rgba(83,177,117,1)] mx-auto mb-2" />
              <p className="text-gray-500 mb-4">{t("map.mapDisplayHere")}</p>
              <Button onClick={handleMapSelection} className="bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.8)]">
                {t("map.useThisLocation")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListItem;
