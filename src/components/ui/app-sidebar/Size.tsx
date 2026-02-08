import { Progress } from '@/components/ui/progress'
import { useFileManager } from '@/contexts/FileManagerContext'

const getSize = (bytes: number, decimals: number = 2) => {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const Size = ({ data }: any) => {
  const maxStorage = Number(
    data.subscription.packages.packageDetails.storage
  );
  

  const { totalSize } = useFileManager();

  const actual = getSize(totalSize, 2);
  const max = getSize(maxStorage, 2);

  const progress =
    maxStorage > 0
      ? Math.max(
          Math.min((totalSize / maxStorage) * 100, 100),
          totalSize > 0 ? 1 : 0
        )
      : 0;

  return (
    <div className='w-10/12 mx-auto mt-4 group-data-[collapsible=icon]:hidden'>
      <Progress value={progress} className='mb-2' />
      <div className='text-sm'>
        {actual} de {max}
      </div>
    </div>
  );
};

export default Size;