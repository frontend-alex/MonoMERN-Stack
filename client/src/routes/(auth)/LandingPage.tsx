import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Github, Sparkles, Rocket, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  
  const { user } = useAuth();
  console.log(user)

  return (
    <div className="min-h-screen relative">
      <header className="relative z-10 p-5">
        <div className="flex justify-end items-center">
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg bg-accent">
              <Layers className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              MonoMERN Stack
            </h1>
            <p className="text-xl text-stone-400 mb-8 max-w-2xl mx-auto">
              Full-stack monorepo boilerplate powered by MongoDB, Express,
              React, and Node.js — built for speed, scalability, and security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Modern Stack
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Built with the latest technologies and best practices using a
                  monorepo structure.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold  mb-2">Production Ready</h3>
                <p className="text-stone-400 text-sm">
                  Optimized for performance, secure by default, and easy to
                  deploy.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </div>

          <footer className="text-sm text-stone-400">
            <p>Start building with confidence. Welcome to MonoMERN.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
