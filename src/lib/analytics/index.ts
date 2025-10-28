// lib/services/analytics.service.ts

export interface ProfileAnalytics {
  overview: {
    totalScans: number
    totalViews: number
    uniqueVisitors: number
    averageTimeOnPage: number
  }
  scansByCard: Array<{
    cardId: string
    cardType: string
    scanCount: number
    lastScanned: Date | null
  }>
  timeline: Array<{
    date: string
    scans: number
    views: number
  }>
  interactions: {
    emailClicks: number
    phoneClicks: number
    websiteClicks: number
    socialClicks: Record<string, number>
  }
  topLocations: Array<{
    country: string
    city: string
    count: number
  }>
  referrers: Array<{
    source: string
    count: number
  }>
}

export class AnalyticsService {
  // static async getProfileAnalytics(userId: string): Promise<ProfileAnalytics> {
  //   const [scans, views, cards] = await Promise.all([
  //     prisma.cardScan.findMany({
  //       where: { card: { userId } },
  //       orderBy: { scannedAt: 'desc' },
  //     }),
  //     prisma.profileView.findMany({
  //       where: { profileUserId: userId },
  //       orderBy: { viewedAt: 'desc' },
  //     }),
  //     prisma.card.findMany({
  //       where: { userId, state: 'activated' },
  //     }),
  //   ]);
  //   const uniqueIps = new Set([
  //     ...scans.map((s) => s.ipAddress),
  //     ...views.map((v) => v.ipAddress),
  //   ]);
  //   const totalTimeOnPage = views.reduce((acc, v) => acc + (v.timeOnPage ?? 0), 0);
  //   const avgTimeOnPage = views.length > 0 ? totalTimeOnPage / views.length : 0;
  //   // Group scans by card
  //   const scansByCard = cards.map((card) => {
  //     const cardScans = scans.filter((s) => s.cardId === card.id);
  //     return {
  //       cardId: card.id,
  //       cardType: card.cardType,
  //       scanCount: cardScans.length,
  //       lastScanned: cardScans[0]?.scannedAt ?? null,
  //     };
  //   });
  //   // Timeline data (last 30 days)
  //   const thirtyDaysAgo = new Date();
  //   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  //   const timeline = this.generateTimeline(scans, views, thirtyDaysAgo);
  //   // Interaction counts
  //   const interactions = this.calculateInteractions(views);
  //   // Top locations
  //   const topLocations = this.calculateTopLocations(scans, views);
  //   // Referrer sources
  //   const referrers = this.calculateReferrers(views);
  //   return {
  //     overview: {
  //       totalScans: scans.length,
  //       totalViews: views.length,
  //       uniqueVisitors: uniqueIps.size,
  //       averageTimeOnPage: avgTimeOnPage,
  //     },
  //     scansByCard,
  //     timeline,
  //     interactions,
  //     topLocations,
  //     referrers,
  //   };
  // }
  // private static generateTimeline(
  //   scans: Array<{ scannedAt: Date }>,
  //   views: Array<{ viewedAt: Date }>,
  //   startDate: Date
  // ): Array<{ date: string; scans: number; views: number }> {
  //   const timelineMap = new Map<string, { scans: number; views: number }>();
  //   // Initialize all dates
  //   for (let i = 0; i < 30; i++) {
  //     const date = new Date(startDate);
  //     date.setDate(date.getDate() + i);
  //     const dateStr = date.toISOString().split('T')[0];
  //     timelineMap.set(dateStr, { scans: 0, views: 0 });
  //   }
  //   // Count scans
  //   scans.forEach((scan) => {
  //     const dateStr = scan.scannedAt.toISOString().split('T')[0];
  //     const entry = timelineMap.get(dateStr);
  //     if (entry) {
  //       entry.scans++;
  //     }
  //   });
  //   // Count views
  //   views.forEach((view) => {
  //     const dateStr = view.viewedAt.toISOString().split('T')[0];
  //     const entry = timelineMap.get(dateStr);
  //     if (entry) {
  //       entry.views++;
  //     }
  //   });
  //   return Array.from(timelineMap.entries()).map(([date, counts]) => ({
  //     date,
  //     ...counts,
  //   }));
  // }
  // private static calculateInteractions(views: Array<{ interactionTypes: string[] }>) {
  //   const interactions = {
  //     emailClicks: 0,
  //     phoneClicks: 0,
  //     websiteClicks: 0,
  //     socialClicks: {} as Record<string, number>,
  //   };
  //   views.forEach((view) => {
  //     view.interactionTypes.forEach((type) => {
  //       if (type === 'email_click') interactions.emailClicks++;
  //       else if (type === 'phone_click') interactions.phoneClicks++;
  //       else if (type === 'website_click') interactions.websiteClicks++;
  //       else if (type.endsWith('_click')) {
  //         const platform = type.replace('_click', '');
  //         interactions.socialClicks[platform] = (interactions.socialClicks[platform] ?? 0) + 1;
  //       }
  //     });
  //   });
  //   return interactions;
  // }
  // private static calculateTopLocations(
  //   scans: Array<{ country: string | null; city: string | null }>,
  //   views: Array<{ country: string | null; city: string | null }>
  // ): Array<{ country: string; city: string; count: number }> {
  //   const locationMap = new Map<string, number>();
  //   [...scans, ...views].forEach((item) => {
  //     if (item.country && item.city) {
  //       const key = `${item.country}|${item.city}`;
  //       locationMap.set(key, (locationMap.get(key) ?? 0) + 1);
  //     }
  //   });
  //   return Array.from(locationMap.entries())
  //     .map(([key, count]) => {
  //       const [country, city] = key.split('|');
  //       return { country, city, count };
  //     })
  //     .sort((a, b) => b.count - a.count)
  //     .slice(0, 10);
  // }
  // private static calculateReferrers(
  //   views: Array<{ source: string }>
  // ): Array<{ source: string; count: number }> {
  //   const referrerMap = new Map<string, number>();
  //   views.forEach((view) => {
  //     referrerMap.set(view.source, (referrerMap.get(view.source) ?? 0) + 1);
  //   });
  //   return Array.from(referrerMap.entries())
  //     .map(([source, count]) => ({ source, count }))
  //     .sort((a, b) => b.count - a.count);
  // }
}
