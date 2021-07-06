import Image from 'next/image'
import logoImage from '../../../public/images/logo.png'

export default function Logo(props: any) {
  const { className } = props
  return (
    <div className={className}>
      <Image src={logoImage} alt="logo" />
    </div>
  )
}
