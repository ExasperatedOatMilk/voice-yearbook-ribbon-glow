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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Voice Yearbook Interview</CardTitle>
            <CardDescription className="text-lg">
              Share your memories and experiences through voice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!interviewUrl ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mic className="w-10 h-10 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Ready to record your voice interview? Click the button below to begin.
                </p>
                <Button 
                  onClick={startInterview} 
                  disabled={loading}
                  size="lg"
                  className="px-8"
                >
                  {loading ? (
                    "Starting Interview..."
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start Voice Interview
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Your Interview is Ready!</h3>
                  <p className="text-muted-foreground mb-4">
                    Follow the voice prompts to complete your interview.
                  </p>
                </div>
                <div className="w-full h-96 border rounded-lg overflow-hidden">
                  <iframe
                    src={interviewUrl}
                    className="w-full h-full"
                    allow="microphone"
                    title="Voice Interview"
                  />
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  <p>Your responses will be automatically saved when the interview is complete.</p>
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