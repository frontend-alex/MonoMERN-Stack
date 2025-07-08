import { Layers } from "lucide-react";
import { Link } from "react-router-dom";

export const SmallAppLogo = () => {
  return (
    <Link to="/">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg mx-auto bg-accent">
          <Layers className="h-5 w-5 text-primary" />
        </div>
    </Link>
  );
};

export const AppLogo = () => {
  return (
    <Link to="/">
      <div className="flex-row-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg mx-auto bg-accent">
          <Layers className="h-5 w-5 text-primary" />
        </div>
        <span className="text-lg font-semibold">MonoMERN</span>
      </div>
    </Link>
  );
};

export default AppLogo;
