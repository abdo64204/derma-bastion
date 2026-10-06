import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductData {
  private products: Product[] = [
    {
      id: 1,
      name: 'Hyaluronic Acid Serum 30ml',
      category: 'Skin Care',
      price: 550,
      image: '',
      badge: 'Best Seller',
      description: 'A lightweight serum that gives skin a fresh, hydrated look and feel.',
      benefits: ['Lightweight, non-greasy texture', 'Absorbs quickly', 'Suitable for daily use'],
      howToUse: 'Apply 2-3 drops to clean skin morning and evening, then follow with moisturizer.',
      ingredients: 'Water, Hyaluronic Acid, Glycerin, Panthenol.',
      ar: {
        name: 'سيروم حمض الهيالورونيك 30 مل',
        category: 'العناية بالبشرة',
        badge: 'الأكثر مبيعاً',
        description: 'سيروم خفيف يمنح البشرة مظهراً وملمساً منتعشاً ومرطباً.',
        benefits: ['قوام خفيف غير دهني', 'سريع الامتصاص', 'مناسب للاستخدام اليومي'],
        howToUse: 'ضع 2-3 قطرات على بشرة نظيفة صباحاً ومساءً، ثم استخدم المرطب.',
        ingredients: 'ماء، حمض الهيالورونيك، جلسرين، بانثينول.'
      }
    },
    {
      id: 2,
      name: 'Niacinamide Serum 10% 30ml',
      category: 'Skin Care',
      price: 475,
      image: '',
      description: 'A balancing serum for a smoother-looking, more even skin tone.',
      benefits: ['Helps skin look more even', 'Lightweight formula', 'Pairs well with a daily moisturizer'],
      howToUse: 'Apply a few drops to clean skin once or twice a day, then moisturize.',
      ingredients: 'Water, Niacinamide, Zinc PCA, Glycerin.',
      ar: {
        name: 'سيروم النياسيناميد 10% 30 مل',
        category: 'العناية بالبشرة',
        description: 'سيروم موازن لبشرة أنعم ولون أكثر تجانساً.',
        benefits: ['يساعد على توحيد مظهر البشرة', 'تركيبة خفيفة', 'يتناسب مع المرطب اليومي'],
        howToUse: 'ضع بضع قطرات على بشرة نظيفة مرة أو مرتين يومياً، ثم استخدم المرطب.',
        ingredients: 'ماء، نياسيناميد، زنك PCA، جلسرين.'
      }
    },
    {
      id: 3,
      name: 'Gentle Cleansing Gel 200ml',
      category: 'Skin Care',
      price: 295,
      image: '',
      description: 'A soft daily cleanser that removes dirt and excess oil without a tight feeling.',
      benefits: ['Gentle for daily use', 'Rinses off cleanly', 'Leaves skin feeling fresh'],
      howToUse: 'Massage a small amount onto a damp face, then rinse with water.',
      ingredients: 'Water, Glycerin, Coco-Betaine, Panthenol.',
      ar: {
        name: 'جل تنظيف لطيف 200 مل',
        category: 'العناية بالبشرة',
        description: 'غسول يومي ناعم يزيل الأوساخ والزيوت الزائدة دون إحساس بالشد.',
        benefits: ['لطيف للاستخدام اليومي', 'يُشطف بسهولة', 'يترك البشرة منتعشة'],
        howToUse: 'دلّك كمية صغيرة على وجه مبلل ثم اشطفه بالماء.',
        ingredients: 'ماء، جلسرين، كوكو بيتين، بانثينول.'
      }
    },
    {
      id: 4,
      name: 'Daily Sunscreen SPF50 50ml',
      category: 'Skin Care',
      price: 450,
      image: '',
      badge: 'New',
      description: 'A daily sunscreen with a light, comfortable finish.',
      benefits: ['SPF50 protection', 'Light feel under makeup', 'Easy to reapply'],
      howToUse: 'Apply generously 15 minutes before sun exposure and reapply every two hours.',
      ingredients: 'Water, UV Filters, Vitamin E, Glycerin.',
      ar: {
        name: 'واقي شمس يومي SPF50 50 مل',
        category: 'العناية بالبشرة',
        badge: 'جديد',
        description: 'واقي شمس يومي بقوام خفيف وملمس مريح.',
        benefits: ['حماية SPF50', 'خفيف تحت المكياج', 'سهل إعادة التطبيق'],
        howToUse: 'ضع كمية كافية قبل التعرض للشمس بـ 15 دقيقة، وأعد التطبيق كل ساعتين.',
        ingredients: 'ماء، فلاتر الأشعة فوق البنفسجية، فيتامين E، جلسرين.'
      }
    },
    {
      id: 5,
      name: 'Intense Tonic Spray 125ml',
      category: 'Hair Care',
      price: 700,
      image: '',
      badge: 'Best Seller',
      description: 'A leave-in scalp and hair tonic in an easy spray bottle.',
      benefits: ['Easy spray application', 'Non-sticky finish', 'Fits into your daily routine'],
      howToUse: 'Spray onto a clean scalp, massage gently, and do not rinse.',
      ingredients: 'Water, Panthenol, Caffeine, Glycerin.',
      ar: {
        name: 'سبراي تونيك مكثف 125 مل',
        category: 'العناية بالشعر',
        badge: 'الأكثر مبيعاً',
        description: 'تونيك للشعر وفروة الرأس بدون شطف، في عبوة سبراي سهلة.',
        benefits: ['تطبيق سهل بالرش', 'ملمس غير لزج', 'يناسب روتينك اليومي'],
        howToUse: 'رشّ على فروة رأس نظيفة ودلّكها برفق دون شطف.',
        ingredients: 'ماء، بانثينول، كافيين، جلسرين.'
      }
    },
    {
      id: 6,
      name: 'Repair Hair Mask 250ml',
      category: 'Hair Care',
      price: 450,
      image: '',
      description: 'A rich mask that leaves hair feeling soft, smooth and easier to style.',
      benefits: ['Deep conditioning feel', 'Softer, smoother hair', 'Ideal for weekly use'],
      howToUse: 'After shampooing, apply to damp hair, leave for 5 minutes, then rinse well.',
      ingredients: 'Water, Cetearyl Alcohol, Shea Butter, Argan Oil.',
      ar: {
        name: 'ماسك إصلاح الشعر 250 مل',
        category: 'العناية بالشعر',
        description: 'ماسك غني يمنح الشعر نعومة وليونة وسهولة في التصفيف.',
        benefits: ['إحساس بترطيب عميق', 'شعر أنعم وأكثر نعومة', 'مثالي للاستخدام الأسبوعي'],
        howToUse: 'بعد الشامبو، ضعه على شعر رطب واتركه 5 دقائق ثم اشطفه جيداً.',
        ingredients: 'ماء، كيتيريل ألكحول، زبدة الشيا، زيت الأرجان.'
      }
    },
    {
      id: 7,
      name: 'Anti-Dandruff Shampoo 250ml',
      category: 'Hair Care',
      price: 320,
      image: '',
      description: 'A daily shampoo made to keep the scalp feeling clean and comfortable.',
      benefits: ['Cleanses the scalp', 'Rich, easy lather', 'Suitable for regular use'],
      howToUse: 'Massage into wet hair and scalp, leave for 2 minutes, then rinse.',
      ingredients: 'Water, Zinc Pyrithione, Sodium Laureth Sulfate, Glycerin.',
      ar: {
        name: 'شامبو مضاد للقشرة 250 مل',
        category: 'العناية بالشعر',
        description: 'شامبو يومي يحافظ على فروة رأس نظيفة ومريحة.',
        benefits: ['ينظف فروة الرأس', 'رغوة غنية وسهلة', 'مناسب للاستخدام المنتظم'],
        howToUse: 'دلّكه على الشعر وفروة الرأس المبللين واتركه دقيقتين ثم اشطفه.',
        ingredients: 'ماء، زنك بيريثيون، صوديوم لوريث سلفات، جلسرين.'
      }
    },
    {
      id: 8,
      name: 'Lashes Treatment Serum 10ml',
      category: 'Eye Care',
      price: 550,
      image: '',
      description: 'A conditioning serum for the lash line, applied as part of your nightly routine.',
      benefits: ['Precision brush applicator', 'Lightweight formula', 'Easy nightly routine'],
      howToUse: 'Apply a thin line along the clean, dry upper lash line before bed.',
      ingredients: 'Water, Panthenol, Biotin, Glycerin.',
      ar: {
        name: 'سيروم علاج الرموش 10 مل',
        category: 'العناية بالعيون',
        description: 'سيروم مغذٍّ لخط الرموش، يُستخدم ضمن روتينك الليلي.',
        benefits: ['فرشاة دقيقة للتطبيق', 'تركيبة خفيفة', 'سهل الاستخدام ليلاً'],
        howToUse: 'ضع خطاً رفيعاً على خط الرموش العلوي النظيف والجاف قبل النوم.',
        ingredients: 'ماء، بانثينول، بيوتين، جلسرين.'
      }
    }
  ];

  getBestSellers(): Product[] {
    return this.products;
  }

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}
