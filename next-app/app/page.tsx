import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { Code } from '@nextui-org/code';
import { button as buttonStyles } from '@nextui-org/theme';
import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';
import ShapeBackground from '@/components/ShapeBg';
import { ShapeBackgroundProps } from '@/components/ShapeBg';

const BgData = [
  {
    image: '/assets/shap.svg',
    size: 400,
    blur: 0,
    zIndex: 1,
    rotation: 23,
    top: '20%',
    left: '0%',
    right: '60%',
    bottom: '0',
    hideOnSmallScreen: false,
  },
];

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center  gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center ">
        {BgData.map((bgProps, index) => (
          <ShapeBackground key={index} {...bgProps} />
        ))}

        <h1 className={title()}>Uniting&nbsp;</h1>
        <h1 className={title({ color: 'violet' })}>Communities:&nbsp;</h1>
        <br />
        <h1 className={title()}>Together, Changing Lives for the Better</h1>
        <h2
          className={subtitle({
            class:
              'mt-5  text-lg text-gray-400 inline-block  text-center justify-center',
          })}
        >
          Join Us in Creating Lasting Impact, One Donation at a Time.{' '}
        </h2>
      </div>
    </section>
  );
}
