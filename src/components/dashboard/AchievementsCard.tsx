'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FaTrophy } from 'react-icons/fa';

interface AchievementData {
  id: string;
  name: string;
  description: string;
}

interface CertificateData {
  id: string;
  name: string;
  description?: string;
  issuedAt: string;
}

interface AchievementsCardProps {
  achievements: AchievementData[];
  certificates: CertificateData[];
}

export function AchievementsCard({ achievements, certificates }: AchievementsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          Thành tích
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* B2A: Chứng chỉ */}
          <div>
            <h4 className="font-medium mb-3">Chứng chỉ</h4>
            <div className="space-y-3">
              {certificates.length > 0 ? (
                certificates.map((certificate) => (
                  <div key={certificate.id} className="flex items-center justify-between p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div>
                      <div className="font-medium">{certificate.name}</div>
                      <div className="text-sm text-gray-600">{certificate.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{new Date(certificate.issuedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Chưa có chứng chỉ</div>
                    <div className="text-sm text-gray-600"></div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">0%</div>
                    <Progress value={0} className="w-20 h-2" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* B2B: Huy hiệu */}
          <div>
            <h4 className="font-medium mb-3">Huy hiệu</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {achievements.length > 0 ? (
                achievements.map((achievement) => (
                  <div key={achievement.id} className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="text-2xl mb-1">🏆</div> {/* Placeholder icon */}
                    <div className="text-sm font-medium">{achievement.name}</div>
                    <div className="text-xs text-gray-600">{achievement.description}</div>
                  </div>
                ))
              ) : (
                <div className="text-center p-3 col-span-full text-muted-foreground">Chưa có huy hiệu nào.</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
