import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Play } from "lucide-react";

const RIBBON_API_KEY = "efbc484a-e854-4465-9426-b98e97bd35db";

const Interview = () => {
  const [interviewUrl, setInterviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    setLoading(true);
    try {
      // In a real app, you'd call your backend API to create the Ribbon interview
      // For demo purposes, we'll simulate this
      const mockUrl = `https://ribbon-interview-demo.com/interview?key=${RIBBON_API_KEY}&timestamp=${Date.now()}`;
      setInterviewUrl(mockUrl);
    } catch (error) {
      console.error("Failed to create interview:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full shadow-nostalgic border-2 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center bg-nostalgic rounded-t-lg border-b">
            <CardTitle className="text-4xl font-display font-bold text-primary mb-2">
              Voice Yearbook Interview
            </CardTitle>
            <CardDescription className="text-lg font-serif text-muted-foreground">
              Share your memories and experiences through the warmth of your voice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!interviewUrl ? (
              <div className="text-center space-y-6 py-8">
                <div className="mx-auto w-24 h-24 bg-primary/15 rounded-full flex items-center justify-center shadow-paper">
                  <Mic className="w-12 h-12 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground font-serif text-lg leading-relaxed">
                    Welcome to your personal voice interview
                  </p>
                  <p className="text-sm text-muted-foreground font-serif">
                    Take a moment to share your story, your wisdom, and your heart through voice
                  </p>
                </div>
                <Button 
                  onClick={startInterview} 
                  disabled={loading}
                  size="lg"
                  className="px-10 py-3 font-serif text-lg shadow-warm hover:shadow-nostalgic transition-all duration-300"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-3"></div>
                      Starting Your Interview...
                    </span>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-3" />
                      Begin Voice Interview
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center bg-nostalgic p-6 rounded-lg border">
                  <h3 className="text-2xl font-display font-semibold mb-3 text-primary">
                    Your Interview Awaits
                  </h3>
                  <p className="text-muted-foreground font-serif text-lg leading-relaxed">
                    Take your time and speak from the heart. Each question is an opportunity to share your unique story.
                  </p>
                </div>
                <div className="w-full h-96 border-2 border-primary/20 rounded-lg overflow-hidden shadow-paper">
                  <iframe
                    src={interviewUrl}
                    className="w-full h-full"
                    allow="microphone"
                    title="Voice Interview"
                  />
                </div>
                <div className="text-center text-sm text-muted-foreground font-serif bg-accent/20 p-4 rounded-lg border">
                  <p>✨ Your heartfelt responses will be automatically preserved when you complete the interview</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Interview;