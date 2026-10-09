import { AppSidebar } from '@/components/Dashboard/AppSidebar';
import NavbarAstro from '@/components/Dashboard/NavbarAstro';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AstroLayout = () => {
  const navigate = useNavigate();
  const toastShown = useRef(false);


  const { astrologer, token, loading } = useSelector((state) => state.astroAuth);
  const { user } = useSelector((state) => state.userAuth)
  const [role, setRole] = useState(localStorage.getItem("role_id"))
  // get role safely

  useEffect(() => {
    if (!role) {
      toastShown.current = true;
      toast.error("Please login first");
      navigate("/", { replace: true });
    }
  }, []);

  if (loading) {
    return <p className="text-center">loading...</p>;
  }

  // if (!role) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <NavbarAstro />
        <div className="px-5">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default AstroLayout;
