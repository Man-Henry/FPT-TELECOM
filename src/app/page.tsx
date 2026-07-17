import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { ProductGrid } from '@/components/home/ProductGrid';
import { BestSellerTable } from '@/components/home/BestSellerTable';
import { CommunityHub } from '@/components/home/CommunityHub';
import { LeadForm } from '@/components/home/LeadForm';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductGrid />
      <BestSellerTable />
      <CommunityHub />
      <LeadForm />
    </>
  );
}
