import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import React, {useState} from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {NavLink, useNavigate} from "react-router-dom";
import {addPost} from "@/services/api";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";

const Post = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    fullName: "",
    xUsername: "",
    resourceUrl: "",
    category: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle category select
  const handleCategoryChange = (value) => {
    setForm((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addPost(form);
      navigate("/dashboard");
      toast.success("Your contribution added successfully");
    } catch (error) {
      console.error("Error while adding entry", error);
      toast.error("Error while adding entry", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <div className="w-full max-w-3xl  max-sm:px-4 space-y-8 rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
            Contribute to Someones Life
          </h1>
        </div>

        <form className="border p-5 rounded-2xl shadow-2xs">
          <div className="flex justify-center flex-col gap-3">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter Title"
            />
          </div>
          <div className="flex justify-center flex-col gap-3 mt-5">
            <Label>Description</Label>
            <textarea
              className="w-full rounded-xl bg-white shadow-sm transition-all text-sm border-gray-200 outline-none placeholder:text-gray-400 p-2"
              rows={5}
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter Description"
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
            <div className="flex justify-center flex-col gap-3 mt-5">
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter Full Name"
              />
            </div>
            <div className="flex justify-center flex-col gap-3 mt-5">
              <Label>X Username</Label>
              <Input
                type="text"
                name="xUsername"
                value={form.xUsername}
                onChange={handleChange}
                placeholder="Enter x Username"
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
            <div className="flex justify-center flex-col gap-3 mt-5">
              <Label>Resource Url (Optional)</Label>
              <Input
                type="text"
                name="resourceUrl"
                value={form.resourceUrl}
                onChange={handleChange}
                placeholder="add Resource Url"
              />
            </div>
            <div className="flex justify-center flex-col gap-3 mt-5">
              <Label>Select Category</Label>
              <Select
                value={form.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="aall">All</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="podcast">Podcast</SelectItem>
                    <SelectItem value="movies">Movies</SelectItem>
                    <SelectItem value="advice">Advice</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 justify-center gap-3 ">
            <NavLink to="/dashboard" className="w-full">
              <Button variant="outline" className="w-full">
                Go Back
              </Button>
            </NavLink>

            <Button onClick={onSubmit} type="submit" className="">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
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
