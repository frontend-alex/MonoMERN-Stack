import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApiMutation } from "@/hooks/hook";
import { toast } from "sonner";

const ProfileSettings = () => {
  const { mutateAsync: deleteUser } = useApiMutation("DELETE", "/auth/delete", {
    invalidateQueries: [["auth", "me"]],
    onSuccess: (data) => toast.success(data.message),
    onError: (err) => toast.error(err.response?.data.message),
  });

  return (
    <Card className="bg-red-600/10 border-none shadow-none">
      <CardContent>
        <div>
          <h3 className="font-medium text-lg text-red-600/50">Danger Zone</h3>
          <p className="text-sm mt-2 text-stone-400 max-w-md">
            Deleting your account is permanent and will remove all your data.
            This action cannot be undone.
          </p>
          <DeleteDialog
            description="You're about to permanently delete your account. This action cannot be undone."
            onConfirm={() => deleteUser(undefined)}
          >
            <Button variant="destructive" className="mt-5">
              Delete Account
            </Button>
          </DeleteDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
