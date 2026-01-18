import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const storageZoneName = process.env.BUNNY_STORAGE_ZONE_NAME;
  const apiKey = process.env.BUNNY_API_KEY;
  const bunnyHostname = process.env.NEXT_PUBLIC_BUNNY_HOSTNAME;

  if (!storageZoneName || !apiKey || !bunnyHostname || storageZoneName === 'your-storage-zone-name') {
    return NextResponse.json({ error: 'Bunny.net credentials are not configured in .env' }, { status: 500 });
  }

  try {
    const { fileBase64, fileName } = await request.json();

    if (!fileBase64 || !fileName) {
      return NextResponse.json({ error: 'File data or name missing.' }, { status: 400 });
    }

    const buffer = Buffer.from(fileBase64, 'base64');
    
    // Use the original filename for the path in Bunny.net
    const bunnyPath = fileName;
    const apiUrl = `https://storage.bunnycdn.com/${storageZoneName}/${bunnyPath}`;

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'AccessKey': apiKey,
        'Content-Type': 'application/octet-stream',
      },
      body: buffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Bunny.net upload failed:', errorText);
      throw new Error(`Failed to upload file to Bunny.net. Status: ${response.status}`);
    }

    const fileUrl = `https://${bunnyHostname}/${bunnyPath}`;

    return NextResponse.json({ success: true, url: fileUrl });

  } catch (error) {
    console.error('Error in upload route:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
