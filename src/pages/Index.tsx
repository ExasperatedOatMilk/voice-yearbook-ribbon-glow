import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Mic, Users, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Voice Yearbook
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Capture memories, share stories, and create lasting connections through the power of voice
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Record Interview</CardTitle>
                <CardDescription>
                  Share your story through our AI-powered voice interview experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/interview">
                  <Button className="w-full" size="lg">
                    Start Recording
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                <CardDescription>
                  Review and manage all voice interview submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/admin">
                  <Button variant="secondary" className="w-full" size="lg">
                    View Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 pt-8 border-t">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span>Powered by Ribbon AI, Gemini AI, and modern web technologies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
