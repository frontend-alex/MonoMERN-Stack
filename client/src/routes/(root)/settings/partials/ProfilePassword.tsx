import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User } from "@shared/types/user";
import {  AccountProviders } from '@shared/types/enums'

const ProfilePassword = ({ user }: {user: User}) => {

  if(user.provider != AccountProviders.Credentials) return null

  return (
      <div className="space-y-8 max-w-3xl mt-5">
        <div className="grid grid-cols-3 gap-8 items-start">
          <div>
            <h3 className="font-medium">Username</h3>
            <p className="text-sm mt-1 text-stone-400">
              This will be your unique identifier.
            </p>
          </div>
          <div className="col-span-2 space-y-4">
            <Input
              type="password"
              className="input no-ring"
              placeholder="Current password"
            />
            <Input
              type="password"
              className="input no-ring"
              placeholder="New Password"
            />
            <Button>Save</Button>
          </div>
        </div>
      </div>
  );
};

export default ProfilePassword;
