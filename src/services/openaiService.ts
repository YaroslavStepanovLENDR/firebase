
import { toast } from "sonner";

// Define the response structure from the OpenAI API
interface GPTResponse {
  title?: string;
  description?: string;
  category?: string;
  condition?: string;
  price?: number;
  brand?: string;
  tags?: string[];
}

/**
 * Processes an image through an external AI service and returns suggested item details
 */
export const processImageWithGPT = async (imageFile: File): Promise<GPTResponse | null> => {
  try {
    toast.info("Processing image with AI...", { duration: 2000 });
    
    // Create FormData to send the image file
    const formData = new FormData();
    formData.append('file', imageFile); 
    
    // Send the image to the specified API endpoint
    const response = await fetch('https://lendr-backend.onrender.com/analyze-image', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }
    
    // Parse the JSON response from the API
    const result: GPTResponse = await response.json();
    
    toast.success("Image processed successfully!");
    return result;
    
  } catch (error) {
    console.error("Error processing image:", error);
    toast.error("Failed to process image with AI. Please try again or enter details manually.");
    return null;
  }
};

/**
 * Combines multiple AI analysis results to find the most common values
 */
export const aggregateGPTResults = (results: GPTResponse[]): GPTResponse => {
  if (results.length === 0) return {};
  if (results.length === 1) return results[0];
  
  // Count occurrences of each value for each field
  const counts: Record<string, Record<string, number>> = {
    title: {},
    description: {},
    category: {},
    condition: {},
    price: {},
    brand: {},
    tags: {}
  };
  
  // Collect all values
  results.forEach(result => {
    if (result.title) {
      counts.title[result.title] = (counts.title[result.title] || 0) + 1;
    }
    if (result.description) {
      counts.description[result.description] = (counts.description[result.description] || 0) + 1;
    }
    if (result.category) {
      counts.category[result.category] = (counts.category[result.category] || 0) + 1;
    }
    if (result.condition) {
      counts.condition[result.condition] = (counts.condition[result.condition] || 0) + 1;
    }
    if (result.price) {
      counts.price[result.price] = (counts.price[result.price] || 0) + 1;
    }
    if (result.brand) {
      counts.brand[result.brand] = (counts.brand[result.brand] || 0) + 1;
    }
    // Combine all tags
    if (result.tags && Array.isArray(result.tags)) {
      result.tags.forEach(tag => {
        counts.tags[tag] = (counts.tags[tag] || 0) + 1;
      });
    }
  });
  
  // Find most common value for each field
  const aggregatedResult: GPTResponse = {};
  
  for (const field of Object.keys(counts) as Array<keyof typeof counts>) {
    if (field === 'tags') {
      // For tags, take all that appear in more than one image
      aggregatedResult.tags = Object.keys(counts.tags)
        .filter(tag => {
          const count = counts.tags[tag];
          // Ensure count is treated as a number
          return typeof count === 'number' && count > 1;
        })
        .slice(0, 5); // Limit to top 5 tags
    } else if (Object.keys(counts[field]).length > 0) {
      // For other fields, take the most common value
      const fieldCounts = counts[field];
      let maxCount = 0;
      let mostCommonValue: any = null;
      
      for (const [value, count] of Object.entries(fieldCounts)) {
        if (count > maxCount) {
          maxCount = count as number;
          mostCommonValue = field === 'price' ? parseFloat(value) : value;
        }
      }
      
      if (mostCommonValue !== null) {
        (aggregatedResult as any)[field] = mostCommonValue;
      }
    }
  }
  
  return aggregatedResult;
};
