import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContainerLayout } from '../layout/container-layout';

export function AnalysisSection() {
  return (
    <ContainerLayout>
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="space-y-4">
                <Skeleton className="h-[200px]" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Skeleton className="h-[100px]" />
                  <Skeleton className="h-[100px]" />
                  <Skeleton className="h-[100px]" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="recommendations">
              <Skeleton className="h-[300px]" />
            </TabsContent>
            <TabsContent value="history">
              <Skeleton className="h-[300px]" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ContainerLayout>
  );
}
