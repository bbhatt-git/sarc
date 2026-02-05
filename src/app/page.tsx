import HeroSection from '@/app/components/hero-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { curriculumDetails, newsItems, stats, whySarcItems } from '@/lib/data';
import { ArrowRight, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import placeholderImages from '@/lib/placeholder-images.json';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default async function Home() {
  const allImages = placeholderImages.placeholderImages;
  const welcomeImage = allImages.find(img => img.id === 'welcome-image');
  const principalImage = allImages.find(img => img.id === 'principal');

  return (
    <div className="flex flex-col items-center animated-fade-in">
      <HeroSection />

      <section id="introduction" className="w-full py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
                Welcome to SARC
              </h2>
              <p className="text-muted-foreground text-lg">
                The Student-Alumni Relations Cell (SARC) at Padma Kanya Multiple Campus is a dynamic, student-led organization committed to building a powerful and enduring bridge between our current students and our global network of esteemed alumni. We cultivate an ecosystem of growth, mentorship, and opportunity.
              </p>
              <div className="flex items-center gap-4 pt-4">
                {principalImage && (
                  <Image 
                    src={principalImage.imageUrl}
                    alt="Principal"
                    width={60}
                    height={60}
                    className="rounded-full ring-2 ring-primary/50"
                  />
                )}
                <div>
                  <p className="font-semibold text-lg">Dr. Evelyn Reed</p>
                  <p className="text-sm text-muted-foreground">Principal, SARC Education Foundation</p>
                </div>
              </div>
              <Button asChild size="lg" className="mt-4 hover:scale-105 transition-transform">
                <Link href="/about">Discover Our Story <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl animated-float">
              {welcomeImage && (
                <Image 
                  src={welcomeImage.imageUrl} 
                  alt={welcomeImage.description}
                  data-ai-hint={welcomeImage.imageHint}
                  fill
                  className="object-cover" 
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="w-full py-20 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="animated-fade-in">
                <p className="text-5xl font-bold text-primary font-headline">{stat.number}</p>
                <p className="text-muted-foreground mt-3 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-sarc" className="w-full py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Why Choose SARC?</h2>
            <p className="max-w-3xl text-muted-foreground md:text-lg mt-4">
              We provide a holistic ecosystem designed to empower students to excel academically, launch successful careers, and become compassionate global citizens.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whySarcItems.map((item, index) => (
              <Card key={item.title} className="glass-card text-center hover:-translate-y-2" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4 text-xl font-headline">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       <section id="academics-preview" className="w-full py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Our Academic Programs</h2>
            <p className="max-w-3xl text-muted-foreground md:text-lg mt-4">
              Explore our diverse range of programs, meticulously designed to equip students with the critical skills and knowledge for a successful and impactful future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {curriculumDetails.slice(0,3).map((level) => (
              <Card key={level.id} className="glass-card hover:-translate-y-2 flex flex-col">
                <CardHeader>
                  <BookOpen className="w-10 h-10 text-primary mb-4" />
                  <CardTitle className="text-2xl font-headline">{level.title}</CardTitle>
                  <p className="text-sm text-primary/80 pt-1">{level.summary}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm">{level.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button asChild variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              <Link href="/academics">Explore All Programs <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="news-preview" className="w-full py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Latest News & Events</h2>
                <p className="max-w-3xl text-muted-foreground md:text-lg mt-4">
                Stay informed with the latest happenings, achievements, and stories from our vibrant community.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {newsItems.slice(0,3).map(item => {
                    const image = allImages.find(img => img.id === item.image);
                    return (
                        <Card key={item.id} className="glass-card overflow-hidden group hover:-translate-y-2">
                            {image && (
                                <div className="relative h-60">
                                    <Image
                                        src={image.imageUrl}
                                        alt={item.title}
                                        data-ai-hint={image.imageHint}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                  <Badge variant="secondary">{item.category}</Badge>
                                  <p>{format(new Date(item.date), 'MMMM dd, yyyy')}</p>
                                </div>
                                <CardTitle className="text-lg font-headline mt-2 group-hover:text-primary transition-colors">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm line-clamp-3">{item.summary}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
             <div className="text-center mt-16">
                <Button asChild size="lg">
                <Link href="/news-gallery">View All News</Link>
                </Button>
            </div>
        </div>
      </section>

      <section id="cta" className="w-full py-20 lg:py-28 bg-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-shadow">
            Ready to Build Your Future?
          </h2>
          <p className="mx-auto max-w-2xl md:text-lg mt-4 text-primary-foreground/80">
            Become part of a vibrant community dedicated to excellence. Apply for admission and start your journey with SARC today.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-10 bg-background text-primary hover:bg-white hover:scale-105 transition-all duration-300">
            <Link href="/admissions">Apply for Admissions <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
