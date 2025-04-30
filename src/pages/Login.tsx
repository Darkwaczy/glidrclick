
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, user, isAdmin } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log("User authenticated, redirecting to dashboard", {isAdmin});
      // Check if user is admin to redirect to the appropriate dashboard
      if (isAdmin || user.email === "admin@glidrclick.com") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, navigate, isAdmin]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Since we're using zod validation, we can be confident that email and password are defined
      const { email, password } = values;
      
      await signIn({ email, password });
      toast.success("Login successful!");
      // Redirection will be handled by the useEffect above
      
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 mt-8">Sign in to your account</h1>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back to Glidrclick
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-glidr-purple hover:text-glidr-purple-dark">
                    Forgot your password?
                  </a>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full gradient-button text-white" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-glidr-purple hover:text-glidr-purple-dark"
              >
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
