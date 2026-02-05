import HeroSection from '@/app/components/hero-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { curriculumDetails, newsItems, stats, whySarcItems } from '@/lib/data';
import { ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
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

      <section id="introduction" className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome to SARC
              </h2>
              <p className="text-muted-foreground text-lg">
                The Student-Alumni Relations Cell (SARC) at Padma Kanya Multiple Campus is a student-led organization dedicated to fostering a strong and lasting relationship between current students and our esteemed alumni network. We provide a platform for personal and professional growth through mentorship, networking events, and skill development workshops.
              </p>
              <div className="flex items-center gap-4">
                {principalImage && (
                  <Image 
                    src={principalImage.imageUrl}
                    alt="Principal"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold">Dr. Evelyn Reed</p>
                  <p className="text-sm text-muted-foreground">Principal, SARC Education Foundation</p>
                </div>
              </div>
              <Button asChild size="lg">
                <Link href="/about">Learn More About Us <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
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

      <section id="stats" className="w-full py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-primary">{stat.number}</p>
                <p className="text-muted-foreground mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-sarc" className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose SARC?</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg mt-4">
              We provide a comprehensive support system to help students excel academically, professionally, and personally.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whySarcItems.map((item) => (
              <Card key={item.title} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4 text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       <section id="academics-preview" className="w-full py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Academic Programs</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-lg mt-4">
              Explore our diverse range of programs designed to equip students with the skills for a successful future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {curriculumDetails.slice(0,3).map((level) => (
              <Card key={level.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BookOpen className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-xl">{level.title}</CardTitle>
                  <p className="text-sm text-muted-foreground pt-1">{level.summary}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{level.description}</p>
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

      <section id="news-preview" className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest News & Events</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg mt-4">
                Stay updated with the latest happenings and achievements from our community.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {newsItems.map(item => {
                    const image = allImages.find(img => img.id === item.image);
                    return (
                        <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                            {image && (
                                <div className="relative h-56">
                                    <Image
                                        src={image.imageUrl}
                                        alt={item.title}
                                        data-ai-hint={image.imageHint}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <Badge variant="secondary" className="w-fit mb-2">{item.category}</Badge>
                                <CardTitle className="text-lg">{item.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">{format(new Date(item.date), 'MMMM dd, yyyy')}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">{item.summary}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
             <div className="text-center mt-12">
                <Button asChild>
                <Link href="/news-gallery">View All News</Link>
                </Button>
            </div>
        </div>
      </section>

      <section id="cta" className="w-full py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Join Us?
          </h2>
          <p className="mx-auto max-w-[600px] md:text-lg mt-4">
            Become part of a vibrant community dedicated to excellence. Apply for admission and start your journey with SARC.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 bg-background text-primary hover:bg-background/90">
            <Link href="/admissions">Apply for Admissions <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
