import HeroSection from '@/app/components/hero-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { curriculumDetails } from '@/lib/data';
import { ArrowRight, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import placeholderImages from '@/lib/placeholder-images.json';

export default async function Home() {
  const heroData = {
    headlines: [
      {
        headline: "Fostering Excellence, Building Character",
        subHeadline: "A transformative education for the leaders of tomorrow."
      },
      {
        headline: "A Legacy of Academic Achievement",
        subHeadline: "Join a community dedicated to intellectual curiosity and personal growth."
      },
      {
        headline: "Empowering Minds, Shaping Futures",
        subHeadline: "Discover your potential at a world-class educational institution."
      }
    ]
  };

  return (
    <div className="flex flex-col items-center">
      <HeroSection headlines={heroData.headlines} />

      <section id="introduction" className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 animated-fade-in">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                Welcome to SARC Education Foundation
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                Nurturing the next generation of leaders through a holistic approach that balances academic rigor with profound character development. At SARC, we don't just educate; we empower, inspire, and cultivate minds to shape a better future.
              </p>
              <Button asChild size="lg">
                <Link href="/about">Learn More About Us <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={placeholderImages.placeholderImages[0].imageUrl} 
                alt={placeholderImages.placeholderImages[0].description}
                data-ai-hint={placeholderImages.placeholderImages[0].imageHint}
                fill
                className="object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      <section id="academics-preview" className="w-full py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 animated-fade-in">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">A World-Class Curriculum</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed mt-4">
              Our academic programs are designed to challenge students and foster a love for lifelong learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {curriculumDetails.map((level) => (
              <Card key={level.id} className="glass-card">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">{level.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{level.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/academics">Explore All Programs <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section id="cta" className="w-full py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center animated-fade-in">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Begin Your Journey at SARC
          </h2>
          <p className="mx-auto max-w-[600px] md:text-xl mt-4">
            Discover a transformative educational experience. Apply now to join a community dedicated to excellence.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 bg-background text-foreground hover:bg-background/90">
            <Link href="/admissions">Apply for Admissions <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
