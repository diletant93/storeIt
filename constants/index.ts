export const navItems = [
  {
    name: 'Dashboard',
    icon: '/assets/icons/dashboard.svg',
    url: '/',
  },
  {
    name: 'Documents',
    icon: '/assets/icons/documents.svg',
    url: '/documents',
  },
  {
    name: 'Images',
    icon: '/assets/icons/images.svg',
    url: '/images',
  },
  {
    name: 'Media',
    icon: '/assets/icons/video.svg',
    url: '/media',
  },
  {
    name: 'Others',
    icon: '/assets/icons/others.svg',
    url: '/others',
  },
  {
    name:'All',
    icon:'/assets/icons/all.svg',
    url:'/all'
  }
];

export const actionsDropdownItems = [
  {
    label: 'Rename',
    icon: '/assets/icons/edit.svg',
    value: 'rename',
  },
  {
    label: 'Details',
    icon: '/assets/icons/info.svg',
    value: 'details',
  },
  {
    label: 'Share',
    icon: '/assets/icons/share.svg',
    value: 'share',
  },
  {
    label: 'Download',
    icon: '/assets/icons/download.svg',
    value: 'download',
  },
  {
    label: 'Delete',
    icon: '/assets/icons/delete.svg',
    value: 'delete',
  },
];

export const sortTypes = [
  {
    label: 'Date created (newest)',
    value: '$createdAt-desc',
  },
  {
    label: 'Created Date (oldest)',
    value: '$createdAt-asc',
  },
  {
    label: 'Name (A-Z)',
    value: 'name-asc',
  },
  {
    label: 'Name (Z-A)',
    value: 'name-desc',
  },
  {
    label: 'Size (Highest)',
    value: 'size-desc',
  },
  {
    label: 'Size (Lowest)',
    value: 'size-asc',
  },
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const AVATAR_PLACEHOLDER_PATH = '/assets/images/avatar.png';
export const SESSION_NAME = 'appwrite-session';
export const EXTENSIONS =
  /\.(aac|mp3|wav|flac|ogg|m4a|mp4|mkv|mov|avi|wmv|flv|webm|jpg|jpeg|png|gif|bmp|svg|pdf|doc|docx|ppt|pptx|xls|xlsx|txt|rtf|zip|rar|7z|tar|gz|iso|html|css|js|ts|json|xml|php|py|java|cpp|c)$/i;
export const TYPES = ['document','audio','video','image','other']
export const PAGES_TYPES = ['documents','images','media','others','all']