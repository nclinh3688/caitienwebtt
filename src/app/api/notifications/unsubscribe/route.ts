import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { endpoint } = await request.json();

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint required' }, { status: 400 });
    }

    // Remove subscription from database (mock implementation)
    if (process.env.NODE_ENV === 'development') console.log('🗑️ Removing push subscription:', {
      userId: session.user.email,
      endpoint
    });

    // In production, remove from database
    // await prisma.pushSubscription.deleteMany({
    //   where: {
    //     userId: session.user.email,
    //     endpoint: endpoint
    //   }
    // });

    return NextResponse.json({ 
      success: true, 
      message: 'Subscription removed successfully' 
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error removing push subscription:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}