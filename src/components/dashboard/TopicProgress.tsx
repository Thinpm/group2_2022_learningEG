
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface TopicProgressItem {
  id: string;
  title: string;
  progress: number;
  totalWords: number;
  learnedWords: number;
}

interface TopicProgressProps {
  topics: TopicProgressItem[];
}

export function TopicProgress({ topics }: TopicProgressProps) {
  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle>Tiến độ theo chủ đề</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topics.map((topic) => (
            <div key={topic.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {topic.learnedWords}/{topic.totalWords} từ ({topic.progress}%)
                  </p>
                </div>
                <Link to={`/topics/${topic.id}`}>
                  <Button variant="ghost" size="sm" className="hover:bg-transparent hover:text-primary">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <Progress value={topic.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
