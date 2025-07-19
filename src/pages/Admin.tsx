import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Play, Pause, Download, Sparkles, Mic } from "lucide-react";
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
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-display font-bold mb-3 text-primary">Voice Yearbook Collection</h1>
          <p className="text-muted-foreground font-serif text-lg leading-relaxed">
            Treasured memories and heartfelt stories from our students
          </p>
        </div>

        {records.length === 0 ? (
          <Card className="shadow-nostalgic border-2 bg-card/80 backdrop-blur-sm">
            <CardContent className="text-center py-16 bg-nostalgic">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground text-xl font-serif">No stories have been shared yet</p>
                <p className="text-sm text-muted-foreground mt-2 font-serif">
                  The yearbook awaits the first heartfelt voice to begin this collection of memories
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8">
            {records.map((record) => (
              <Card key={record.id} className="w-full shadow-nostalgic border-2 bg-card/80 backdrop-blur-sm">
                <CardHeader className="bg-nostalgic border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-display text-primary">{record.studentName}</CardTitle>
                      <CardDescription className="font-serif text-base">
                        Shared on {new Date(record.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
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
                    <div className="bg-primary/8 border-2 border-primary/25 rounded-lg p-6 shadow-paper">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span className="font-serif font-semibold text-primary">Treasured Quote</span>
                      </div>
                      <blockquote className="text-xl font-serif italic text-foreground leading-relaxed">
                        "{record.highlight}"
                      </blockquote>
                    </div>
                  )}

                  {record.audioUrl && (
                    <div className="space-y-3 bg-accent/10 p-4 rounded-lg border">
                      <h4 className="font-serif font-semibold text-foreground flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Voice Recording
                      </h4>
                      <audio controls className="w-full">
                        <source src={record.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-secondary/50 p-4 rounded-lg border">
                        <h4 className="font-serif font-semibold mb-3 flex items-center gap-2 text-primary">
                          Proudest Moment
                          <Badge variant="secondary" className="font-serif">Story</Badge>
                        </h4>
                        <p className="text-foreground font-serif leading-relaxed">{record.proudMoment}</p>
                      </div>
                      
                      <div className="bg-secondary/50 p-4 rounded-lg border">
                        <h4 className="font-serif font-semibold mb-3 flex items-center gap-2 text-primary">
                          Funniest Memory
                          <Badge variant="secondary" className="font-serif">Story</Badge>
                        </h4>
                        <p className="text-foreground font-serif leading-relaxed">{record.funniestMemory}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-secondary/50 p-4 rounded-lg border">
                        <h4 className="font-serif font-semibold mb-3 flex items-center gap-2 text-primary">
                          Wisdom to Share
                          <Badge variant="secondary" className="font-serif">Advice</Badge>
                        </h4>
                        <p className="text-foreground font-serif leading-relaxed">{record.advice}</p>
                      </div>
                      
                      <div className="bg-secondary/50 p-4 rounded-lg border">
                        <h4 className="font-serif font-semibold mb-3 flex items-center gap-2 text-primary">
                          Beloved Teacher
                          <Badge variant="secondary" className="font-serif">Appreciation</Badge>
                        </h4>
                        <p className="text-foreground font-serif leading-relaxed">{record.favoriteTeacher}</p>
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