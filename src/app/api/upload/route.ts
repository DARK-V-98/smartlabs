import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // IMPORTANT: This is a placeholder. You need to implement the actual file upload logic to Bunny.net.
  
  const storageZoneName = process.env.BUNNY_STORAGE_ZONE_NAME;
  const apiKey = process.env.BUNNY_API_KEY;
  const bunnyHostname = process.env.NEXT_PUBLIC_BUNNY_HOSTNAME;

  if (!storageZoneName || !apiKey || !bunnyHostname || storageZoneName === 'your-storage-zone-name') {
    return NextResponse.json({ error: 'Bunny.net credentials are not configured in .env' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    // STEP 1: Construct the Bunny.net API URL.
    // We'll use the original filename here, but you might want to generate a unique name.
    const bunnyPath = file.name;
    const apiUrl = `https://storage.bunnycdn.com/${storageZoneName}/${bunnyPath}`;

    // STEP 2: Use the fetch API to upload the file.
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'AccessKey': apiKey,
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!response.ok) {
      // If the upload failed, log the response and return an error.
      const errorText = await response.text();
      console.error('Bunny.net upload failed:', errorText);
      throw new Error(`Failed to upload file to Bunny.net. Status: ${response.status}`);
    }

    // STEP 3: If the upload is successful, construct the public URL to the file.
    const fileUrl = `https://${bunnyHostname}/${bunnyPath}`;

    // STEP 4: Return the public URL in the response.
    return NextResponse.json({ success: true, url: fileUrl });

  } catch (error) {
    console.error('Error in upload route:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
