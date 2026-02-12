'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { NAV_LINKS } from '@/lib/constants';
import Link from 'next/link';
import PageHeader from '@/app/components/page-header';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type SearchResult = {
  label: string;
  href: string;
  description: string;
  category: string;
};

const allPages = NAV_LINKS.flatMap(link => {
  if (link.children) {
    return link.children.map(child => ({ ...child, category: link.label }));
  }
  // Exclude Home and Gallery from being just a link, they are top-level pages
  if (link.href === '/' || link.href === '/gallery' || link.href === '/contact') {
      return { ...link, description: `Main page for ${link.label}`, category: 'Main' };
  }
  return [];
}).filter(Boolean) as (Omit<(typeof NAV_LINKS[0] & {children?: undefined}), 'children'> & { description: string, category: string })[];

function SearchComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const filteredResults = allPages.filter(page =>
        page.label.toLowerCase().includes(lowerCaseQuery) ||
        (page.description && page.description.toLowerCase().includes(lowerCaseQuery)) ||
        page.category.toLowerCase().includes(lowerCaseQuery)
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <PageHeader title="Search Results" subtitle={query ? `For "${query}"` : "Enter a search term"} />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {query && results.length > 0 ? (
            <div className="space-y-4">
                <p className="text-muted-foreground">{results.length} result(s) found</p>
                {results.map(result => (
                    <Link href={result.href} key={result.href} passHref>
                        <Card className="testimonial-card cursor-pointer transition-transform hover:-translate-y-1">
                          <CardHeader>
                            <CardTitle className="text-primary">{result.label}</CardTitle>
                            <CardDescription>{result.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{result.category}</p>
                          </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-4">
                <Search className="h-16 w-16" />
                <h3 className="text-2xl font-semibold text-foreground">
                    {query ? 'No Results Found' : 'Search SARC'}
                </h3>
                <p className="max-w-md">
                    {query ? `Sorry, we couldn't find any pages matching your search for "${query}". Try a different keyword.` : 'Use the search bar in the navigation to find information on our site.'}
                </p>
            </div>
        )}
      </div>
    </div>
  );
}

export default function SearchView() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchComponent />
        </Suspense>
    )
}
