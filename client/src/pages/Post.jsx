import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import React, {useState} from "react";

const Post = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <div className="w-full max-w-3xl  max-sm:px-4 space-y-8 rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
            Contribute to Someones Life
          </h1>
        </div>

        <form>
          <div className="flex justify-center flex-col gap-3">
            <Label>Title</Label>
            <Input type="text" placeholder="Enter Title" />
          </div>
          <div className="flex justify-center flex-col gap-3 mt-5">
            <Label>Description</Label>
            <Input type="text" placeholder="Enter Description" />
          </div>
          <div className="flex justify-center flex-col gap-3 mt-5">
            <Label>Username</Label>
            <Input type="text" placeholder="username" />
          </div>
          <div className="flex justify-center flex-col gap-3 mt-5">
            <Label>Twitter Username</Label>
            <Input type="text" placeholder="Twitter Username" />
          </div>
          <div className="flex justify-center flex-col gap-3 mt-5">
            <Label>Add Resource Url (Optional)</Label>
            <Input type="text" placeholder="add Resource Url if any" />
          </div>

          <div className="mt-5">
            <Button type="submit" className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
