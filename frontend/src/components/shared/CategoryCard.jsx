import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Heart, Baby, Users, Stethoscope, Accessibility, Wheat, Briefcase, Home, Wallet, Rocket, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const iconMap = {
  education: GraduationCap, women: Heart, children: Baby, 'senior-citizens': Users,
  healthcare: Stethoscope, 'disability-support': Accessibility, agriculture: Wheat,
  employment: Briefcase, housing: Home, 'financial-assistance': Wallet,
  entrepreneurship: Rocket, scholarships: Award,
};

export function CategoryCard({ category }) {
  const Icon = iconMap[category.id];
  return (
    <Card className="group p-5" hover>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-navy-900 group-hover:text-primary-700 transition-colors">{category.name}</h3>
          <p className="mt-1 text-xs text-gray-500 leading-relaxed">{category.description}</p>
          <p className="mt-2 text-xs font-semibold text-primary-600">{category.schemeCount} schemes</p>
        </div>
      </div>
      <Link to={`/schemes?category=${category.id}`} className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">
        Explore <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Card>
  );
}
