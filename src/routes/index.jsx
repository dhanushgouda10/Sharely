import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { DashboardHome } from '../pages/DashboardHome';
import { BrowseItems } from '../pages/BrowseItems';
import { PostItem } from '../pages/PostItem';
import { ItemDetails } from '../pages/ItemDetails';
import { MyListings } from '../pages/MyListings';
import { MyRequests } from '../pages/MyRequests';
import { ProfileSettings } from '../pages/ProfileSettings';
import { NotFound } from '../pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="browse" element={<BrowseItems />} />
        <Route path="post" element={<PostItem />} />
        <Route path="items/:id" element={<ItemDetails />} />
        <Route path="listings" element={<MyListings />} />
        <Route path="requests" element={<MyRequests />} />
        <Route path="profile" element={<ProfileSettings />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
