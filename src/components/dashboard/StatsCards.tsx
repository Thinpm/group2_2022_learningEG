
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar, Clock, FireExtinguisher, Target, Zap } from "lucide-react";

interface StatsCardsProps {
  streakDays: number;
  totalWords: number;
  studyHours: number;
  masteredWords: number;
}

export function StatsCards({ streakDays, totalWords, studyHours, masteredWords }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="glassmorphism hover-lift">
        <CardHeader className="pb-2">
          <CardDescription>Chuỗi ngày học</CardDescription>
          <CardTitle className="text-3xl flex items-center justify-between">
            {streakDays} ngày
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-100 dark:bg-orange-900">
              <Zap className="h-5 w-5 text-orange-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Tiếp tục chuỗi ngày học để nhận thêm phần thưởng!
          </div>
        </CardContent>
      </Card>
      
      <Card className="glassmorphism hover-lift">
        <CardHeader className="pb-2">
          <CardDescription>Tổng số từ vựng</CardDescription>
          <CardTitle className="text-3xl flex items-center justify-between">
            {totalWords} từ
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Tổng số từ vựng đã học trong 30 ngày qua
          </div>
        </CardContent>
      </Card>
      
      <Card className="glassmorphism hover-lift">
        <CardHeader className="pb-2">
          <CardDescription>Thời gian học</CardDescription>
          <CardTitle className="text-3xl flex items-center justify-between">
            {studyHours} giờ
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900">
              <Clock className="h-5 w-5 text-green-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Tổng thời gian học trong tháng này
          </div>
        </CardContent>
      </Card>
      
      <Card className="glassmorphism hover-lift">
        <CardHeader className="pb-2">
          <CardDescription>Từ đã thành thạo</CardDescription>
          <CardTitle className="text-3xl flex items-center justify-between">
            {masteredWords} từ
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-900">
              <Award className="h-5 w-5 text-purple-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Số từ vựng bạn đã thành thạo hoàn toàn
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
