import useFileStore from '@/store/ui/ui-file';
import { AlignJustify, LayoutGrid } from 'lucide-react'

const FileLayout = () => {
	const { layoutType, setLayoutType } = useFileStore((state) => ({
		layoutType: state.layoutType,
		setLayoutType: state.setLayoutType,
	  }));
	return (
		<div className='flex items-center justify-center w-32 overflow-hidden border rounded-full cursor-pointer border-zinc-500'>
			<span
				className={`w-full h-full bg-blue-200 ${
					layoutType === 'list' ? 'bg-opacity-40' : 'bg-opacity-0'
				}`}
				onClick={() => setLayoutType('list')}
			>
				<AlignJustify className='h-full mx-auto scale-75' />
			</span>
			<div className='bg-zinc-500 w-[0.5px] h-full cursor-default'></div>
			<span
				className={`w-full h-full bg-blue-200 ${
					layoutType === 'grid' ? 'bg-opacity-40' : 'bg-opacity-0'
				}`}
				onClick={() => setLayoutType("grid")}
			>
				<LayoutGrid className='h-full mx-auto scale-75' />
			</span>
		</div>
	)
}

export default FileLayout
