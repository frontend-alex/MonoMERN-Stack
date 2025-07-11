import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ProfileSettings = () => {
  return (
    <Card className="bg-red-600/20">
      <CardContent>
        <div>
          <h3 className="font-medium text-lg text-red-600/50">Danger Zone</h3>
          <p className="text-sm mt-2 text-stone-400 max-w-md">
            Deleting your account is permanent and will remove all your data.
            This action cannot be undone.
          </p>
          <Button variant="destructive" className="mt-5">
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
