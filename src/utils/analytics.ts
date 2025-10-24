export interface CardAnalytics {
  totalScans: number
  uniqueVisitors: number
  scansByDay: {date: string; count: number}[]
  topLocations: {country: string; city: string; count: number}[]
  scansByHour: number[] // 24-hour distribution
  conversionEvents: {
    emailClicks: number
    phoneClicks: number
    websiteClicks: number
    socialClicks: number
  }
}

// export async function getCardAnalytics(cardId: string, userId: string): Promise<CardAnalytics> {
// Verify ownership
// const card = await db.cards.findUnique({
//   where: { id: cardId, userId }
// });

// if (!card) throw new Error('Unauthorized');

// Aggregate scan data
// const scans = await db.cardScans.findMany({
//   where: { cardId },
//   orderBy: { scannedAt: 'desc' }
// });

// return {
//   totalScans: scans.length,
//   uniqueVisitors: new Set(scans.map(s => s.ipAddress)).size,
//   // ... more aggregations
// };
// }
