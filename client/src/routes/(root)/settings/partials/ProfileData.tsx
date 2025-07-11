import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

const ProfileData = () => {

  const { user } = useAuth();

  return (
    <div className="">
      <div className="space-y-8 max-w-3xl">
        <div>
          <h2 className="text-xl font-medium mb-2">Account Information</h2>
          <p className="text-sm">
            Update your username and email address here.
          </p>
        </div>

        <Separator />

        {/* Username Row */}
        <div className="grid grid-cols-3 gap-8 items-start">
          <div>
            <h3 className="font-medium">Username</h3>
            <p className="text-sm mt-1 text-stone-400">This will be your unique identifier.</p>
          </div>
          <div className="col-span-2 space-y-4">
            <Input defaultValue={user?.username} className="input no-ring" placeholder="John Doe" />
            <Button>
              Save
            </Button>
          </div>
        </div>


        {/* Email Row */}
        <div className="grid grid-cols-3 gap-8 items-start">
          <div>
            <h3 className="font-medium ">Email address</h3>
            <p className="text-sm mt-1 text-stone-400">
              This will be used for notifications and login.
            </p>
          </div>
          <div className="col-span-2 space-y-4">
            <Input
              type="email"
              defaultValue={user?.email}
              className="input no-ring"
              
            />
            <Button>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
