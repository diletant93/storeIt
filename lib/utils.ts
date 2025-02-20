import { PAGES_TYPES, TYPES } from '@/constants';
import { toast } from '@/hooks/use-toast';
import { constructPathType } from '@/types/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function handleError(error: unknown, message: string) {
  throw error;
}
export function parseStringify(value: unknown) {
  return JSON.parse(JSON.stringify(value));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + ' Bytes'; // Less than 1 KB, show in Bytes
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + ' KB'; // Less than 1 MB, show in KB
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + ' MB'; // Less than 1 GB, show in MB
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 2) + ' GB'; // 1 GB or more, show in GB
  }
};

export const calculateAngle = (sizeInBytes: number) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024; // 2GB in bytes
  const percentage = (sizeInBytes / totalSizeInBytes) * 360;
  return Number(percentage.toFixed(2));
};

export const calculatePercentage = (sizeInBytes: number) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024; // 2GB in bytes
  const percentage = (sizeInBytes / totalSizeInBytes) * 100;
  return Number(percentage.toFixed(1));
};

export const getFileType = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();

  if (!extension) return { type: 'other', extension: '' };

  const documentExtensions = [
    'pdf',
    'doc',
    'docx',
    'txt',
    'xls',
    'xlsx',
    'csv',
    'rtf',
    'ods',
    'ppt',
    'odp',
    'md',
    'html',
    'htm',
    'epub',
    'pages',
    'fig',
    'psd',
    'ai',
    'indd',
    'xd',
    'sketch',
    'afdesign',
    'afphoto',
    'afphoto',
  ];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'webm'];
  const audioExtensions = ['mp3', 'wav', 'ogg', 'flac'];

  if (documentExtensions.includes(extension))
    return { type: 'document', extension };
  if (imageExtensions.includes(extension)) return { type: 'image', extension };
  if (videoExtensions.includes(extension)) return { type: 'video', extension };
  if (audioExtensions.includes(extension)) return { type: 'audio', extension };

  return { type: 'other', extension };
};

export const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return '—';

  const date = new Date(isoString);

  // Get hours and adjust for 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'pm' : 'am';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time and date parts
  const time = `${hours}:${minutes.toString().padStart(2, '0')}${period}`;
  const day = date.getDate();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};

export const getFileIcon = (
  extension: string | undefined,
  type: string, //here must be a FileType
) => {
  switch (extension) {
    // Document
    case 'pdf':
      return '/assets/icons/file-pdf.svg';
    case 'doc':
      return '/assets/icons/file-doc.svg';
    case 'docx':
      return '/assets/icons/file-docx.svg';
    case 'csv':
      return '/assets/icons/file-csv.svg';
    case 'txt':
      return '/assets/icons/file-txt.svg';
    case 'xls':
    case 'xlsx':
      return '/assets/icons/file-document.svg';
    // Image
    case 'svg':
      return '/assets/icons/file-image.svg';
    // Video
    case 'mkv':
    case 'mov':
    case 'avi':
    case 'wmv':
    case 'mp4':
    case 'flv':
    case 'webm':
    case 'm4v':
    case '3gp':
      return '/assets/icons/file-video.svg';
    // Audio
    case 'mp3':
    case 'mpeg':
    case 'wav':
    case 'aac':
    case 'flac':
    case 'ogg':
    case 'wma':
    case 'm4a':
    case 'aiff':
    case 'alac':
      return '/assets/icons/file-audio.svg';

    default:
      switch (type) {
        case 'image':
          return '/assets/icons/file-image.svg';
        case 'document':
          return '/assets/icons/file-document.svg';
        case 'video':
          return '/assets/icons/file-video.svg';
        case 'audio':
          return '/assets/icons/file-audio.svg';
        default:
          return '/assets/icons/file-other.svg';
      }
  }
};

// APPWRITE URL UTILS
// Construct appwrite file URL - https://appwrite.io/docs/apis/rest#images
export const constructFileUrl = (storageFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID}/files/${storageFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

export const constructDownloadUrl = (storageFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID}/files/${storageFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

// DASHBOARD UTILS
export const getUsageSummary = (totalSpace: any) => {
  return [
    {
      title: 'Documents',
      size: totalSpace.document.size,
      latestDate: totalSpace.document.latestDate,
      icon: '/assets/icons/file-document-light.svg',
      url: '/documents',
    },
    {
      title: 'Images',
      size: totalSpace.image.size,
      latestDate: totalSpace.image.latestDate,
      icon: '/assets/icons/file-image-light.svg',
      url: '/images',
    },
    {
      title: 'Media',
      size: totalSpace.video.size + totalSpace.audio.size,
      latestDate:
        totalSpace.video.latestDate > totalSpace.audio.latestDate
          ? totalSpace.video.latestDate
          : totalSpace.audio.latestDate,
      icon: '/assets/icons/file-video-light.svg',
      url: '/media',
    },
    {
      title: 'Others',
      size: totalSpace.other.size,
      latestDate: totalSpace.other.latestDate,
      icon: '/assets/icons/file-other-light.svg',
      url: '/others',
    },
  ];
};

export const getFileTypesParams = (type: string) => {
  switch (type) {
    case 'documents':
      return ['document'];
    case 'images':
      return ['image'];
    case 'media':
      return ['video', 'audio'];
    case 'others':
      return ['other'];
    default:
      return ['all'];
  }
};
export function parseQueryString(queryString: string) {
  const result: {
    searchText?: string;
    sort?: string;
    limit?: number;
    page?: number;
  } = {};

  // Ensure the query string is not empty
  if (!queryString || queryString.trim() === '') {
    return result;
  }

  // Split the query string into parts using '?' as the delimiter
  const parts = queryString.split('?');

  // The first part before '?' is the filter (if it exists and is not empty)
  if (parts[0] && parts[0].trim() !== '') {
    result.searchText = parts[0];
  }

  // Process the remaining parts (e.g., sort, limit, page, pageSize)
  parts.slice(1).forEach((part) => {
    if (part.startsWith('sort=')) {
      result.sort = part.replace('sort=', '');
    } else if (part.startsWith('limit=')) {
      const limitValue = parseInt(part.replace('limit=', ''), 10);
      if (!isNaN(limitValue)) {
        result.limit = limitValue;
      }
    } else if (part.startsWith('page=')) {
      const pageValue = parseInt(part.replace('page=', ''), 10);
      if (!isNaN(pageValue)) {
        result.page = pageValue;
      }
    }
  });

  return result;
}

export function getProperType(type: string): string[] {
  switch (type) {
    case 'video':
      return ['media'];
    case 'audio':
      return ['audio'];
      case 'all':
        return ['all']
    default:
      return [type + 's'];
  }
}
export function constructPath({
  paramName,
  paramValue,
  searchQuery,
  pathname,
}: {
  paramName: string;
  paramValue: string;
  searchQuery?: string;
  pathname: string;
}) {
  let result: string;

  // Initialize the base path
  if (searchQuery) {
    result = `${pathname}?${searchQuery}`;
  } else {
    result = pathname;
  }

  // Create a dynamic regex to match the given param name
  const paramRegex = new RegExp(`[?&]${paramName}=[^&]*`);

  // Check if the parameter already exists
  if (paramRegex.test(result)) {
    // Replace the existing parameter value
    result = result.replace(paramRegex, match => `${match[0]}${paramName}=${paramValue}`);
  } else {
    // Append the parameter depending on the presence of "?"
    result += result.includes('?') ? `&${paramName}=${paramValue}` : `?${paramName}=${paramValue}`;
  }

  return result;
}
export function getFirstPathSegment(pathname: string): string {
  const [path] = pathname.split('?'); // Remove the query string
  const segments = path.split('/').filter(Boolean);
  return PAGES_TYPES.includes(segments[0]) ? segments[0] : 'all';
}
