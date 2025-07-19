import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Play, Pause, Download, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InterviewRecord {
  id: string;
  studentName: string;
  proudMoment: string;
  funniestMemory: string;
  advice: string;
  favoriteTeacher: string;
  audioUrl: string;
  highlight?: string;
  createdAt: string;
}

const Admin = () => {
  const [records, setRecords] = useState<InterviewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingHighlight, setGeneratingHighlight] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      // Load from local storage (simulating JSON file storage)
      const stored = localStorage.getItem('voiceYearbook');
      const data = stored ? JSON.parse(stored) : [];
      setRecords(data);
    } catch (error) {
      console.error("Failed to fetch records:", error);
      toast({
        title: "Error",
        description: "Failed to load interview records",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateHighlight = async (recordId: string, transcript: string) => {
    setGeneratingHighlight(recordId);
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyC1fzE0SbyiogpLsrru4MDsk_SMJq3XPIA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Extract a heartwarming, inspiring quote (1-2 sentences) from this student interview transcript. Focus on wisdom, growth, or meaningful moments: "${transcript}"`
            }]
          }]
        })
      });

      const data = await response.json();
      const highlight = data.candidates?.[0]?.content?.parts?.[0]?.text || "No highlight generated";

      // Update the record with the highlight
      const updatedRecords = records.map(record => 
        record.id === recordId ? { ...record, highlight } : record
      );
      setRecords(updatedRecords);
      localStorage.setItem('voiceYearbook', JSON.stringify(updatedRecords));

      toast({
        title: "Success",
        description: "Highlight generated successfully!",
      });
    } catch (error) {
      console.error("Failed to generate highlight:", error);
      toast({
        title: "Error",
        description: "Failed to generate highlight",
        variant: "destructive",
      });
    } finally {
      setGeneratingHighlight(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading interview records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Voice Yearbook Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and review student voice interviews
          </p>
        </div>

        {records.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground text-lg">No interview records found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Students can submit interviews to start building the voice yearbook
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {records.map((record) => (
              <Card key={record.id} className="w-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{record.studentName}</CardTitle>
                      <CardDescription>
                        Submitted on {new Date(record.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateHighlight(record.id, 
                          `${record.proudMoment} ${record.funniestMemory} ${record.advice}`
                        )}
                        disabled={generatingHighlight === record.id}
                      >
                        {generatingHighlight === record.id ? (
                          "Generating..."
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Highlight
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {record.highlight && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="font-medium text-primary">AI Generated Highlight</span>
                      </div>
                      <blockquote className="text-lg italic">"{record.highlight}"</blockquote>
                    </div>
                  )}

                  {record.audioUrl && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Audio Recording</h4>
                      <audio controls className="w-full">
                        <source src={record.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          Proudest Moment
                          <Badge variant="secondary">Response</Badge>
                        </h4>
                        <p className="text-muted-foreground">{record.proudMoment}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          Funniest Memory
                          <Badge variant="secondary">Response</Badge>
                        </h4>
                        <p className="text-muted-foreground">{record.funniestMemory}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          Advice to Others
                          <Badge variant="secondary">Response</Badge>
                        </h4>
                        <p className="text-muted-foreground">{record.advice}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          Favorite Teacher
                          <Badge variant="secondary">Response</Badge>
                        </h4>
                        <p className="text-muted-foreground">{record.favoriteTeacher}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;