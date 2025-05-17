import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { db, auth } from "./firebase";
import Index from "./pages/Index";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import SupBoardDetail from "./pages/SupBoardDetail";
import GoProDetail from "./pages/GoProDetail";
import ToolSetDetail from "./pages/ToolSetDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/layout/Layout";
import JokerCostumeDetail from "./pages/JokerCostumeDetail";
import PetCarrierDetail from "./pages/PetCarrierDetail";
import PlasticChairsDetail from "./pages/PlasticChairsDetail";
import SantaCruzMTBDetail from "./pages/SantaCruzMTBDetail";
import SingleKayakDetail from "./pages/SingleKayakDetail";
import ListItem from "./pages/ListItem";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ManageListings from "./pages/ManageListings";
import RentalHistory from "./pages/RentalHistory";
import EditProfile from "./pages/EditProfile";
import PreviewListing from "./pages/PreviewListing";
// @ts-nocheck
import UploadImage from "./pages/UploadImage";
import AddListing from "./pages/AddListing";
// ...

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={<Navigate to="/home" replace />} 
            />
            <Route 
              path="/home" 
              element={
                <Layout>
                  <Index />
                </Layout>
              } 
            />
            <Route 
              path="/product/detail" 
              element={
                <Layout>
                  <ProductDetail />
                </Layout>
              } 
            />
            <Route 
              path="/product/sup-board" 
              element={
                <Layout>
                  <SupBoardDetail />
                </Layout>
              } 
            />
            <Route 
              path="/product/gopro" 
              element={
                <Layout>
                  <GoProDetail />
                </Layout>
              } 
            />
            <Route 
              path="/product/tool-set" 
              element={
                <Layout>
                  <ToolSetDetail />
                </Layout>
              } 
            />
            <Route 
              path="/product/joker-costume" 
              element={
                <Layout>
                  <JokerCostumeDetail />
                </Layout>
              } 
            />
            <Route 
              path="/product/pet-carrier" 
              element={
                <Layout>
                  <PetCarrierDetail />
                </Layout>
              } 
            />
            <Route 
              path="/product/plastic-chairs" 
              element={
                <Layout>
                  <PlasticChairsDetail />
                </Layout>
              } 
            />
            <Route 
              path="/product/santa-cruz-mtb" 
              element={
                <Layout>
                  <SantaCruzMTBDetail />
                </Layout>
              } 
            />
            <Route 
              path="/product/single-kayak" 
              element={
                <Layout>
                  <SingleKayakDetail />
                </Layout>
              } 
            />
            <Route 
              path="/search" 
              element={
                <Layout>
                  <Search />
                </Layout>
              } 
            />
            <Route 
              path="/list" 
              element={
                <Layout>
                  <ListItem />
                </Layout>
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <Layout>
                  <div className="max-w-[420px] mx-auto p-5 min-h-screen">
                    <h1 className="text-2xl font-semibold">Notifications</h1>
                    <p className="mt-4">Notifications coming soon.</p>
                  </div>
                </Layout>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <Layout>
                  <Profile />
                </Layout>
              } 
            />
            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/register" 
              element={<Register />} 
            />
            {/* Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              } 
            />
            <Route 
              path="/manage-listings" 
              element={
                <Layout>
                  <ManageListings />
                </Layout>
              } 
            />
            <Route 
              path="/rental-history" 
              element={
                <Layout>
                  <RentalHistory />
                </Layout>
              } 
            />
            <Route 
              path="/manage-profile" 
              element={
                <Layout>
                  <EditProfile />
                </Layout>
              } 
            />
            <Route
  path="/add"
  element={
    <Layout>
      <AddListing />
    </Layout>
  }
/>
<Route path="/list" element={<UploadImage />} />
            <Route 
              path="/preview-listing" 
              element={
                <Layout>
                  <PreviewListing />
                </Layout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


