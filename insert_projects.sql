-- Insert Projects Data for Ebtsama Development Foundation
-- This file contains INSERT statements for all projects from the text file

-- Note: Make sure the projects table exists before running these queries
-- Run the table creation script first if needed

BEGIN;

-- Project 1: Empowering People with Disabilities Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Empowering People with Disabilities Project',
    'مشروع تمكين ذوي الإعاقة',
    'The project aims to empower 100 people with disabilities in Marib and Hadramout governorates by providing them with modern means of transportation and technology that enable them to work and be financially independent. The project includes providing 40 small buses with a capacity of 7 passengers and 30 three-wheeled "tuk-tuk" motorcycles specially equipped for people with disabilities, with the ability to drive manually or with available limbs, in addition to providing 30 laptops with excellent specifications for people with disabilities interested in the field of montage and design after training and qualifying them.',
    'يهدف المشروع إلى تمكين 100 شخص من ذوي الإعاقة في محافظتي مأرب وحضرموت من خلال تزويدهم بوسائل نقل حديثة وتكنولوجيا تمكنهم من العمل والاستقلال المالي. يتضمن المشروع توفير 40 باصًا صغيرًا سعة 7 ركاب و30 دراجة نارية "توك توك" بثلاث عجلات مجهزة خصيصًا لذوي الإعاقة، مع القدرة على القيادة اليدوية أو بالأطراف المتاحة، إلى جانب توفير 30 جهاز لابتوب بمواصفات ممتازة لذوي الإعاقة المهتمين بمجال المونتاج والتصميم بعد تدريبهم وتأهيلهم.',
    '/assets/mockimage.jpg',
    '#2563EB',
    'empowering-people-with-disabilities-project',
    'مشروع-تمكين-ذوي-الاعاقة',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 335772, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 100, "beneficiaryTargetEn": "people with special needs", "beneficiaryTargetAr": "من ذوي الاحتياجات الخاصة"}]',
    ARRAY['disability', 'empowerment', 'transportation', 'technology', 'independence', 'marib', 'hadramout'],
    ARRAY['إعاقة', 'تمكين', 'نقل', 'تكنولوجيا', 'استقلال', 'مأرب', 'حضرموت'],
    ARRAY['empowerment', 'disability', 'transportation'],
    ARRAY['تمكين', 'إعاقة', 'نقل'],
    true,
    NOW()
);

-- Project 2: (STEP) Youth Empowerment Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    '(STEP) Youth Empowerment Project',
    'مشروع (خطوة) لتمكين الشباب',
    'The Youth Empowerment Project offers a comprehensive set of training courses covering essential programs demanded by the labor market. These courses provide enrolled young individuals with practical skills, empowering them to pursue diverse career paths or launch their own small-scale projects. The project will be distributed over four governorates (Aden - Taiz - Marib - Hadramout). Training Programs Include: Basic computer programs, Communication and public relations skills, Teamwork skills, Design and graphics, Website and application design, Website and application programming, Digital marketing, Accounting for non-accountants.',
    'المشروع عبارة عن مجموعة من الدورات التدريبية على مجموعة من البرامج التي يحتاجها سوق العمل والتي تمكن الشباب الملتحقين بها من اكتساب المهارات العملية التي تمكنهم من الالتحاق بالوظائف المختلفة أو من خلال تمكينهم من فتح مشاريع صغيرة خاصة بهم. سيتوزع المشروع على أربع محافظات (عدن – تعز – مأرب – حضرموت). تتضمن هذه البرامج: برامج الحاسوب الأساسية، مهارات الاتصال والعلاقات العامة، مهارات العمل ضمن الفريق، التصميم والجرافيكس، تصميم المواقع والتطبيقات، برمجة المواقع والتطبيقات، التسويق الرقمي، المحاسبة لغير المحاسبين.',
    '/assets/mockimage.jpg',
    '#10B981',
    'step-youth-empowerment-project',
    'مشروع-خطوة-لتمكين-الشباب',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 50000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 200, "beneficiaryTargetEn": "young men and women", "beneficiaryTargetAr": "شاب وشابة"}]',
    ARRAY['youth', 'empowerment', 'training', 'skills', 'employment', 'entrepreneurship', 'technology'],
    ARRAY['شباب', 'تمكين', 'تدريب', 'مهارات', 'توظيف', 'ريادة', 'تكنولوجيا'],
    ARRAY['youth', 'training', 'skills'],
    ARRAY['شباب', 'تدريب', 'مهارات'],
    true,
    NOW()
);

-- Project 3: Youth Forum for University Students Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Youth Forum for University Students Project',
    'مشروع الملتقى الشبابي للطلاب الجامعيين',
    'The project aims to equip a group of participants with a range of skills and knowledge over a full week. Through the following activities: Training courses in various fields such as leadership, innovation, entrepreneurship, and self-development skills. Various sports activities such as football, volleyball, swimming, walking, and cycling. Cultural and artistic events such as theater and chanting. Dialogue sessions and educational seminars on various topics of importance to young people. Field trips and tours.',
    'يهدف المشروع إلى إكساب مجموعة من المهارات والمعارف للمشاركين على مدار أسبوع كامل. تتضمن الأنشطة التالية: دورات تدريبية في مجالات مختلفة مثل مهارات القيادة والابتكار وريادة الأعمال والتنمية الذاتية. أنشطة رياضية متنوعة مثل كرة القدم والطائرة والسباحة والمشي وركوب الدراجات. فعاليات ثقافية وفنية مثل المسرح والإنشاد. جلسات حوارية وندوات تثقيفية حول موضوعات مختلفة ذات أهمية للشباب. رحلات وجولات سياحية.',
    '/assets/mockimage.jpg',
    '#8B5CF6',
    'youth-forum-university-students-project',
    'مشروع-الملتقى-الشبابي-للطلاب-الجامعيين',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 11255, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 100, "beneficiaryTargetEn": "students", "beneficiaryTargetAr": "طالب وطالبة"}]',
    ARRAY['youth', 'university', 'students', 'leadership', 'innovation', 'sports', 'culture', 'development'],
    ARRAY['شباب', 'جامعة', 'طلاب', 'قيادة', 'ابتكار', 'رياضة', 'ثقافة', 'تنمية'],
    ARRAY['youth', 'students', 'forum'],
    ARRAY['شباب', 'طلاب', 'ملتقى'],
    true,
    NOW()
);

-- Project 4: School Bag and Uniform Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'School Bag and Uniform Project',
    'مشروع الحقيبة والزي المدرسي',
    'The School Bag and Uniform Project aims to supply school bags and uniforms to boys and girls students from orphaned and economically disadvantaged families, empowering them to pursue their education with dignity and confidence. The project will distribute 1,000 school bags equipped with essential stationery, along with uniforms for both male and female students in displacement camps in four governorates (Aden - Taiz - Marib - Hadramout).',
    'يهدف هذا المشروع إلى توفير الحقائب والزي المدرسي للطلاب والطالبات من الأيتام والأسر المحتاجة، وذلك لتمكينهم من مواصلة تعليمهم بكرامة وثقة. سيتم توزيع 1,000 حقيبة مدرسية مجهزة بالقرطاسية اللازمة، إضافة إلى الزي المدرسي للطلاب والطالبات في مخيمات النزوح في أربع محافظات (عدن – تعز – مأرب – حضرموت).',
    '/assets/mockimage.jpg',
    '#F59E0B',
    'school-bag-uniform-project',
    'مشروع-الحقيبة-والزي-المدرسي',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 35000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 1000, "beneficiaryTargetEn": "students", "beneficiaryTargetAr": "طالب وطالبة"}]',
    ARRAY['education', 'school', 'bags', 'uniforms', 'students', 'orphans', 'dignity'],
    ARRAY['تعليم', 'مدرسة', 'حقائب', 'زي', 'طلاب', 'أيتام', 'كرامة'],
    ARRAY['education', 'school', 'support'],
    ARRAY['تعليم', 'مدرسة', 'دعم'],
    true,
    NOW()
);

-- Project 5: School Books Safety Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'School Books Safety Project',
    'مشروع السلامة لحماية الكتب المدرسية',
    'This project aims to provide 20 iron caravans for 20 schools in the city and Alwadi of Marib governorate and Hadramout governorate. These caravans will be designed and equipped in a way suitable for storing and preserving textbooks, due to the lack of special storage facilities for textbooks in the targeted schools.',
    'يهدف هذا المشروع إلى توفير عدد 20 كرفانة حديد لعدد 20 مدرسة في مديريتي المدينة والوادي بمحافظتي مأرب وحضرموت يتم تصميمها وتجهيزها بطريقة ملائمة لتكون مناسبة لتخزين الكتب المدرسية والمحافظة عليها نظرًا لعدم توفر مخازن خاصة بالكتب المدرسية في المدارس المستهدفة.',
    '/assets/mockimage.jpg',
    '#EF4444',
    'school-books-safety-project',
    'مشروع-السلامة-لحماية-الكتب-المدرسية',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 61320, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 20, "beneficiaryTargetEn": "schools", "beneficiaryTargetAr": "مدرسة"}]',
    ARRAY['education', 'schools', 'books', 'storage', 'safety', 'infrastructure'],
    ARRAY['تعليم', 'مدارس', 'كتب', 'تخزين', 'سلامة', 'بنية تحتية'],
    ARRAY['education', 'infrastructure', 'safety'],
    ARRAY['تعليم', 'بنية تحتية', 'سلامة'],
    true,
    NOW()
);

-- Project 6: A Family Care Project For a Whole Year
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'A Family Care Project For a Whole Year',
    'مشروع رعاية أسرة لمدة عام كامل',
    'The project aims to provide monthly food support to displaced families who have lost or weakened their sources of income as a result of the difficult circumstances the country is going through, which has negatively affected their livelihood and stability. The project targets (400) displaced families in Marib and Hadhramaut governorates, distributed as follows: Average family: 200 families receive a basic food basket worth $25 per month, including: (5 kg Basmati rice - 4 liters of oil - 5 kg sugar - 1 kg dates - half a carton of pasta). Large family: 200 families receive an expanded food basket worth $50 per month, including: (25 kg flour - 10 kg basmati rice - 4 liters of oil - 10 kg sugar - half a carton of beans).',
    'يهدف المشروع إلى تقديم الدعم الغذائي الشهري للأسر النازحة التي فقدت أو ضعفت مصادر دخلها نتيجة الظروف الصعبة التي تمر بها البلاد، مما أثر سلبًا على معيشتهم واستقرارهم. يستهدف المشروع (400) أسرة نازحة في محافظة مأرب وحضرموت، موزعة على الشكل التالي: الأسرة المتوسطة: 200 أسرة تحصل على سلة غذائية أساسية بقيمة 25 دولار شهريًا، وتشمل: 5 كجم أرز بسمتي – 4 لتر زيت – 5 كجم سكر – 1 كجم تمر – نصف كرتون مكرونة. الأسرة الكبيرة: 200 أسرة تحصل على سلة غذائية موسعة بقيمة 50 دولار شهريًا، وتشمل: 25 كجم دقيق – 10 كجم أرز بسمتي – 4 لتر زيت – 10 كجم سكر – نصف كرتون فاصوليا.',
    '/assets/mockimage.jpg',
    '#059669',
    'family-care-project-whole-year',
    'مشروع-رعاية-أسرة-لمدة-عام-كامل',
    '[{"costTitleEn": "Monthly Cost", "costTitleAr": "التكلفة الشهرية", "costAmount": 15000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "monthly", "costPeriodAr": "شهريًا"}, {"costTitleEn": "Annual Cost", "costTitleAr": "التكلفة السنوية", "costAmount": 180000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "annually", "costPeriodAr": "سنويًا"}]',
    '[{"beneficiaryAmount": 400, "beneficiaryTargetEn": "families per month", "beneficiaryTargetAr": "أسرة شهريًا"}]',
    ARRAY['food', 'families', 'displaced', 'support', 'monthly', 'aid', 'nutrition'],
    ARRAY['غذاء', 'أسر', 'نازحة', 'دعم', 'شهري', 'مساعدة', 'تغذية'],
    ARRAY['food', 'families', 'aid'],
    ARRAY['غذاء', 'أسر', 'مساعدة'],
    true,
    NOW()
);

-- Project 7: Hot Meal Distribution Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Hot Meal Distribution Project',
    'مشروع توزيع الوجبات الساخنة',
    'The project aims to distribute 4,000 hot meals to displaced families in IDP camps, particularly those living in tents, to alleviate the burden of cooking in hot desert conditions. Each meal will consist of: 1 chicken, 3 plates of rice, 1 bag of bread, fruit, and 1 bottle of juice. The project will be executed through a contract with a reputable restaurant to prepare the meals and deliver them to the intended beneficiaries.',
    'يهدف المشروع إلى توزيع عدد 4,000 وجبة ساخنة للأسر النازحة التي تعيش في الخيام لتخفيف معاناة الطباخة في ظروف المناخ الصحراوي الحار حيث تحتوي الوجبة الواحدة على: حبة دجاج + 3 أطباق أرز + كيس خبز + فاكهة + قارورة عصير. سيتم التنفيذ بالتعاقد مع أحد المطاعم المتميزة لإعداد الوجبات ويتم توزيعها على المستهدفين.',
    '/assets/mockimage.jpg',
    '#DC2626',
    'hot-meal-distribution-project',
    'مشروع-توزيع-الوجبات-الساخنة',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 40000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 4000, "beneficiaryTargetEn": "families", "beneficiaryTargetAr": "أسرة"}]',
    ARRAY['food', 'hot meals', 'displaced', 'camps', 'nutrition', 'relief'],
    ARRAY['غذاء', 'وجبات ساخنة', 'نازحة', 'مخيمات', 'تغذية', 'إغاثة'],
    ARRAY['food', 'relief', 'camps'],
    ARRAY['غذاء', 'إغاثة', 'مخيمات'],
    true,
    NOW()
);

-- Project 8: Loaf of Life Project (Bread Distribution for Displaced Families)
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Loaf of Life Project (Bread Distribution for Displaced Families)',
    'مشروع رغيف الحياة (توزيع الخبز للأسر النازحة)',
    'Thousands of displaced families in IDP camps struggle to access bread, a staple of Yemeni meals, due to its rising price. To address this urgent need, the project aims to distribute ready-made bread daily for three months to 1,000 of the most vulnerable families in Al-Jufina Camp, the largest camp for displaced persons in Marib Governorate.',
    'تواجه الآلاف من الأسر النازحة في المخيمات صعوبة كبيرة في الحصول على الخبز الذي يعتبر المكون الرئيسي لوجبات الطعام عند اليمنيين نتيجة لارتفاع قيمته، ونظرًا للحاجة الملحة لتوفير الخبز يستهدف المشروع توزيع الخبز الجاهز يوميًا ولمدة ثلاثة أشهر لعدد 1,000 أسرة من الأسر الأشد احتياجًا في مخيم الجفينة (أكبر مخيم للنازحين في محافظة مأرب).',
    '/assets/mockimage.jpg',
    '#92400E',
    'loaf-of-life-project',
    'مشروع-رغيف-الحياة',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 99000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "3 months", "costPeriodAr": "3 أشهر"}]',
    '[{"beneficiaryAmount": 1000, "beneficiaryTargetEn": "families (approximately 5,500 individuals)", "beneficiaryTargetAr": "أسرة (ما يقارب 5,500 فرد)"}]',
    ARRAY['bread', 'food', 'displaced', 'families', 'daily', 'staple', 'nutrition'],
    ARRAY['خبز', 'غذاء', 'نازحة', 'أسر', 'يومي', 'أساسي', 'تغذية'],
    ARRAY['bread', 'food', 'daily'],
    ARRAY['خبز', 'غذاء', 'يومي'],
    true,
    NOW()
);

-- Project 9: Orphan Sponsorship Programs
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Orphan Sponsorship Programs',
    'برامج كفالة فاقدي المعيل (الأيتام)',
    'The Sponsorship of the Breadwinners Project aims to provide financial and psychological support to orphans in the governorates (Aden - Taiz - Marib - Hadramout), focusing on meeting their basic needs and enhancing their educational opportunities. The monthly sponsorship value is set at $30, of which $20 per month is allocated to provide direct cash support to the orphan, helping him meet his daily needs. In addition, $10 per month is allocated to provide an educational bag and a new school uniform at the beginning of each school year, as well as Eid al-Fitr and Eid al-Adha clothing, which contributes to enhancing the well-being of children and enabling them to better integrate into society.',
    'يهدف مشروع كفالة فاقدي المعيل إلى تقديم الدعم المالي والنفسي للأيتام في المحافظات (عدن - تعز - مأرب - حضرموت)، حيث يركز على تلبية احتياجاتهم الأساسية وتعزيز فرص تعليمهم. يتم تحديد قيمة الكفالة الشهرية بمبلغ 30 دولارًا، تُخصص منها 20 دولارًا شهريًا لتوفير الدعم النقدي المباشر لليتيم، مما يساعده في تلبية احتياجاته اليومية. بالإضافة إلى ذلك، يُخصص مبلغ 10 دولارات شهريًا لتوفير حقيبة تعليمية وزي مدرسي جديد في بداية كل عام دراسي، فضلًا عن كسوة عيد الفطر وكسوة عيد الأضحى.',
    '/assets/mockimage.jpg',
    '#7C3AED',
    'orphan-sponsorship-programs',
    'برامج-كفالة-فاقدي-المعيل',
    '[{"costTitleEn": "Monthly Cost", "costTitleAr": "التكلفة الشهرية", "costAmount": 18000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "monthly", "costPeriodAr": "شهريًا"}]',
    '[{"beneficiaryAmount": 600, "beneficiaryTargetEn": "orphans", "beneficiaryTargetAr": "يتيم"}]',
    ARRAY['orphans', 'sponsorship', 'children', 'support', 'education', 'financial', 'welfare'],
    ARRAY['أيتام', 'كفالة', 'أطفال', 'دعم', 'تعليم', 'مالي', 'رعاية'],
    ARRAY['orphans', 'sponsorship', 'children'],
    ARRAY['أيتام', 'كفالة', 'أطفال'],
    true,
    NOW()
);

-- Project 10: Helping People with Chronic Diseases Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Helping People with Chronic Diseases Project',
    'مشروع مساعدة ذوي الأمراض المزمنة',
    'Chronic diseases are prevalent in the modern era and pose significant health risks, particularly for vulnerable populations such as displaced individuals, the impoverished, and those with limited incomes who lack access to treatment in the governorates (Aden - Taiz - Marib - Hadramout). Adhering to prescribed medications regularly is crucial for managing these diseases and their complications. This project aims to provide necessary medications for 400 patients suffering from various chronic diseases for one year, with an average cost of $20 per person per month.',
    'الأمراض المزمنة من أمراض العصر التي تشكل خطورة صحية كبيرة على المصابين بها خصوصًا على النازحين الفقراء وذوي الدخل المحدود الذين لا يمتلكون القدرة على شراء العلاج في المحافظات (عدن – تعز – مأرب – حضرموت). من أجل التغلب على هذه الأمراض ومضاعفاتها يجب على المريض الالتزام باستخدام الأدوية المقررة له من الأطباء بشكل مستمر. سيوفر هذا المشروع الأدوية اللازمة لعدد 400 مريض ومريضة لمدة عام (بمتوسط 20 دولار للفرد شهريًا).',
    '/assets/mockimage.jpg',
    '#DC2626',
    'helping-people-chronic-diseases-project',
    'مشروع-مساعدة-ذوي-الأمراض-المزمنة',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 96000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "annually", "costPeriodAr": "سنويًا"}]',
    '[{"beneficiaryAmount": 400, "beneficiaryTargetEn": "patients", "beneficiaryTargetAr": "مريض ومريضة"}]',
    ARRAY['healthcare', 'chronic diseases', 'patients', 'medications', 'medical', 'treatment'],
    ARRAY['رعاية صحية', 'أمراض مزمنة', 'مرضى', 'أدوية', 'طبي', 'علاج'],
    ARRAY['healthcare', 'chronic', 'treatment'],
    ARRAY['رعاية صحية', 'مزمن', 'علاج'],
    true,
    NOW()
);

-- Project 11: Restoring a Ebtsama Project to support disabled children
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Restoring a Ebtsama Project to support disabled children in Marib Governorate',
    'مشروع إعادة ابتسامة لدعم الأطفال المعاقين في محافظة مأرب',
    'The project aims to improve the lives of 312 children with disabilities in Marib Governorate, where disability cases have increased due to the conflict and poor health care during pregnancy and childbirth, causing many children to suffer from cerebral palsy. The project provides customized splints that meet each child needs to support their movement, in addition to two months of motor training to improve their motor and social skills. It also includes providing health kits containing hygiene items and clothes, which enhances children independence and reduces the burden on their families.',
    'يهدف المشروع إلى تحسين حياة 312 طفلًا من ذوي الإعاقة في محافظة مأرب، حيث تزايدت حالات الإعاقة نتيجة النزاع وسوء الرعاية الصحية أثناء الحمل والولادة، مما تسبب في إصابة العديد من الأطفال بالشلل الدماغي. يقدم المشروع جبائر مخصصة تلبي احتياجات كل طفل لدعم حركته، إلى جانب تدريبات حركية لمدة شهرين لتحسين مهاراتهم الحركية والاجتماعية. كما يشمل توفير حقائب صحية تحتوي على أدوات نظافة وملابس.',
    '/assets/mockimage.jpg',
    '#F59E0B',
    'restoring-Ebtsama-project-disabled-children',
    'مشروع-إعادة-ابتسامة-لدعم-الأطفال-المعاقين',
    '[{"costTitleEn": "Average per person", "costTitleAr": "القيمة المتوسطة للفرد", "costAmount": 800, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}, {"costTitleEn": "Total Cost", "costTitleAr": "القيمة الإجمالية", "costAmount": 124800, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 312, "beneficiaryTargetEn": "children (boys and girls)", "beneficiaryTargetAr": "طفلًا"}]',
    ARRAY['disability', 'children', 'rehabilitation', 'mobility', 'healthcare', 'support', 'cerebral palsy'],
    ARRAY['إعاقة', 'أطفال', 'تأهيل', 'حركة', 'رعاية صحية', 'دعم', 'شلل دماغي'],
    ARRAY['disability', 'children', 'rehabilitation'],
    ARRAY['إعاقة', 'أطفال', 'تأهيل'],
    true,
    NOW()
);

-- Project 12: Winter Warmth Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Winter Warmth Project',
    'مشروع دفء الشتاء',
    'This project aims to support 800 displaced families and host community families in the governorates of (Aden - Taiz - Marib - Hadramout) with the onset of the harsh winter, as the camps suffer from a severe shortage of heating means. The project will provide 1,600 blankets weighing 3 kg, and winter clothes including 800 mens jackets and 800 womens jackets, in addition to 800 girls suits and 800 boys suits for children, which will contribute to improving living conditions and protecting the targeted families from the dangers of the cold.',
    'يهدف هذا المشروع إلى دعم 800 أسرة من النازحين وأسر المجتمع المضيف في محافظات (عدن - تعز - مأرب - حضرموت) مع دخول فصل الشتاء القارس، حيث تعاني المخيمات من نقص شديد في وسائل التدفئة. سيوفر المشروع 1,600 بطانية بوزن 3 كجم، وملابس شتوية تشمل 800 جاكت رجالي و800 جاكت نسائي، بالإضافة إلى 800 بدلة بناتي و800 بدلة ولادي للأطفال.',
    '/assets/mockimage.jpg',
    '#1E40AF',
    'winter-warmth-project',
    'مشروع-دفء-الشتاء',
    '[{"costTitleEn": "Average per person", "costTitleAr": "القيمة المتوسطة للفرد", "costAmount": 54, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}, {"costTitleEn": "Total Cost", "costTitleAr": "القيمة الإجمالية", "costAmount": 43200, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 800, "beneficiaryTargetEn": "families", "beneficiaryTargetAr": "أسرة"}]',
    ARRAY['winter', 'warmth', 'blankets', 'clothing', 'families', 'displaced', 'cold'],
    ARRAY['شتاء', 'دفء', 'بطانيات', 'ملابس', 'أسر', 'نازحة', 'برد'],
    ARRAY['winter', 'warmth', 'clothing'],
    ARRAY['شتاء', 'دفء', 'ملابس'],
    true,
    NOW()
);

-- Project 13: Eid Clothing Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Eid Clothing Project',
    'مشروع كسوة العيدين',
    'This project aims to bring joy and happiness to 4,000 orphaned boys and girls and children of needy displaced families in four Yemeni governorates (Aden - Taiz - Marib - Hadramout), and to alleviate the suffering of their families on the blessed Eid al-Fitr and Eid al-Adha.',
    'يستهدف هذا المشروع إدخال الفرحة والسرور على 4,000 طفل وطفلة من الأيتام وأبناء الأسر النازحة المحتاجة في أربع محافظات يمنية (عدن – تعز – مأرب – حضرموت)، وتخفيف المعاناة عن ذويهم في عيدي الفطر والأضحى المباركين.',
    '/assets/mockimage.jpg',
    '#059669',
    'eid-clothing-project',
    'مشروع-كسوة-العيدين',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 140000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 4000, "beneficiaryTargetEn": "children (boys and girls)", "beneficiaryTargetAr": "طفل وطفلة"}]',
    ARRAY['eid', 'clothing', 'children', 'orphans', 'joy', 'festival', 'celebration'],
    ARRAY['عيد', 'كسوة', 'أطفال', 'أيتام', 'فرحة', 'احتفال', 'مناسبة'],
    ARRAY['eid', 'clothing', 'children'],
    ARRAY['عيد', 'كسوة', 'أطفال'],
    true,
    NOW()
);

-- Project 14: Adha Sacrifice Meat Distribution Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Adha Sacrifice Meat Distribution Project',
    'مشروع توزيع لحوم الأضاحي',
    'The project aims to bring joy and happiness to 10,000 displaced families, orphans, and needy families during the blessed Eid al-Adha. Each family will receive a quarter of a sheep sacrifice in four governorates (Aden - Taiz - Marib - Hadramout). This initiative embodies social solidarity and cohesion among members of society, representing one of the greatest acts of worship to God Almighty during the ten days of Dhu al-Hijjah and the days of Tashriq. Average: $130 for a sheep, $800 for a bull.',
    'يهدف المشروع لإدخال الفرحة والسرور لعدد 10,000 أسرة من الأسر النازحة والأيتام والمحتاجين في يوم عيد الأضحى المبارك حيث سيتم توزيع ربع أضحية من الغنم للأسرة الواحدة في أربع محافظات (عدن – تعز – مأرب – حضرموت). يمثل هذا المشروع أحد أوجه التكافل والترابط بين أفراد المجتمع وهو من أعظم القربات إلى الله سبحانه وتعالى في أيام عشر ذي الحجة وأيام التشريق. بمتوسط: 130 دولار قيمة للغنم، و800 دولار قيمة للثور.',
    '/assets/mockimage.jpg',
    '#B91C1C',
    'adha-sacrifice-meat-distribution-project',
    'مشروع-توزيع-لحوم-الأضاحي',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 325000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 10000, "beneficiaryTargetEn": "families", "beneficiaryTargetAr": "أسرة"}]',
    ARRAY['eid adha', 'sacrifice', 'meat', 'families', 'religious', 'solidarity', 'charity'],
    ARRAY['عيد الأضحى', 'أضاحي', 'لحوم', 'أسر', 'ديني', 'تكافل', 'خيري'],
    ARRAY['sacrifice', 'religious', 'charity'],
    ARRAY['أضاحي', 'ديني', 'خيري'],
    true,
    NOW()
);

-- Project 15: School Teachers' Rehabilitation Project in IDP camps
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'School Teachers'' Rehabilitation Project in IDP camps',
    'مشروع تأهيل معلمي المدارس في مخيمات النزوح',
    'The School Teachers› Rehabilitation Project in IDP camps aims to enhance the quality of education in four governorates (Aden - Taiz - Marib - Hadramout). The project specifically targets 60 male and female teachers from basic education schools within specific targeted camps. These teachers will undergo a week-long training program consisting of (42 training hours).',
    'يهدف المشروع إلى تحسين جودة التعليم في أربع محافظات (عدن – تعز – مأرب – حضرموت). ويستهدف المشروع 60 معلم ومعلمة من معلمي التعليم الأساسي في مدارس المخيمات المستهدفة، حيث سيتم تزويدهم بمجموعة من البرامج التدريبية لمدة أسبوع (42 ساعة تدريبية).',
    '/assets/mockimage.jpg',
    '#0891B2',
    'school-teachers-rehabilitation-project-idp-camps',
    'مشروع-تأهيل-معلمي-المدارس-في-مخيمات-النزوح',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 33000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 60, "beneficiaryTargetEn": "teachers", "beneficiaryTargetAr": "معلم ومعلمة"}]',
    ARRAY['education', 'teachers', 'training', 'rehabilitation', 'camps', 'quality', 'capacity building'],
    ARRAY['تعليم', 'معلمين', 'تدريب', 'تأهيل', 'مخيمات', 'جودة', 'بناء قدرات'],
    ARRAY['education', 'teachers', 'training'],
    ARRAY['تعليم', 'معلمين', 'تدريب'],
    true,
    NOW()
);

-- Project 16: Humanitarian Training of Trainers Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Humanitarian Training of Trainers Project',
    'مشروع تدريب المدربين في مجال العمل الإنساني',
    'This project aims to strengthen the capacities of 60 trainers from 60 local organizations in three governorates (Taiz - Marib - Hadramout) by providing a comprehensive experience that combines theoretical and practical aspects to qualify them to train volunteers and workers in the field of humanitarian work, and apply social work issues and sustainable development principles. The project encourages cooperation with humanitarian organizations and enhances interaction with community issues.',
    'يهدف هذا المشروع إلى تعزيز قدرات 60 مدربًا من 60 منظمة محلية في ثلاث محافظات (تعز - مأرب - حضرموت)، من خلال تقديم تجربة شاملة تجمع بين النواحي النظرية والعملية لتأهيلهم على تدريب المتطوعين والعاملين في حقل العمل الإنساني، وتطبيق قضايا العمل الاجتماعي ومبادئ التنمية المستدامة. يشجع المشروع على التعاون مع المنظمات الإنسانية ويعزز التفاعل مع قضايا المجتمع.',
    '/assets/mockimage.jpg',
    '#7C2D12',
    'humanitarian-training-trainers-project',
    'مشروع-تدريب-المدربين-في-مجال-العمل-الإنساني',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 13671, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 60, "beneficiaryTargetEn": "trainers", "beneficiaryTargetAr": "مدرب"}]',
    ARRAY['humanitarian', 'training', 'trainers', 'capacity building', 'organizations', 'development', 'social work'],
    ARRAY['إنساني', 'تدريب', 'مدربين', 'بناء قدرات', 'منظمات', 'تنمية', 'عمل اجتماعي'],
    ARRAY['humanitarian', 'training', 'capacity'],
    ARRAY['إنساني', 'تدريب', 'قدرات'],
    true,
    NOW()
);

-- Project 17: Family Counseling Diploma Project (Family Ebtsama)
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Family Counseling Diploma Project (Family Ebtsama)',
    'مشروع دبلوم الإرشاد الأسري (ابتسامة الأسرة)',
    'The Family Guidance Diploma (Smiling Family) Project aims to enhance family relationships and provide psychological support in Marib Governorate, which is experiencing congestion due to an influx of displaced populations. The program consists of two phases: In the first phase, we will train 20 individuals to become proficient in the psychological support program. In the second phase, family guidance will be extended to 400 individuals from families experiencing psychological and social challenges.',
    'يهدف المشروع إلى تحسين العلاقات الأسرية وتعزيز الدعم النفسي في محافظة مأرب، التي تعاني من ازدحام النازحين الذي أدى بدوره الى خلق تحديات اقتصادية واجتماعية توثر سلبًا على الوضع النفسي والاجتماعي للنازحين. يتكون البرنامج من مرحلتين: المرحلة الأولى: سيتم تدريب 20 مدربًا لتمكينهم من برنامج الدعم النفسي. المرحلة الثانية: سيتم تقديم الإرشاد الأسري لعدد 400 من أفراد الأسر المتضررة نفسيًا واجتماعيًا.',
    '/assets/mockimage.jpg',
    '#EC4899',
    'family-counseling-diploma-project',
    'مشروع-دبلوم-الإرشاد-الأسري',
    '[{"costTitleEn": "Training Trainers Cost", "costTitleAr": "تكلفة تدريب المتدربين", "costAmount": 16420, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}, {"costTitleEn": "20 Training Courses Cost", "costTitleAr": "تكلفة 20 دورة تدريبية", "costAmount": 36200, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "for 400 individuals", "costPeriodAr": "لعدد 400 متدرب"}]',
    '[{"beneficiaryAmount": 20, "beneficiaryTargetEn": "trainers in phase 1", "beneficiaryTargetAr": "مدرب في المرحلة الأولى"}, {"beneficiaryAmount": 400, "beneficiaryTargetEn": "individuals in phase 2", "beneficiaryTargetAr": "فرد في المرحلة الثانية"}]',
    ARRAY['family', 'counseling', 'psychological support', 'relationships', 'training', 'social', 'mental health'],
    ARRAY['أسرة', 'إرشاد', 'دعم نفسي', 'علاقات', 'تدريب', 'اجتماعي', 'صحة نفسية'],
    ARRAY['family', 'counseling', 'psychological'],
    ARRAY['أسرة', 'إرشاد', 'نفسي'],
    true,
    NOW()
);

-- Project 18: (Aid) Project for the Distribution of Dry Meals
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    '(Aid) Project for the Distribution of Dry Meals',
    'مشروع (إعانة) لتوزيع الوجبات الجافة',
    'The project aims to distribute dry meals to university students residing far from their families, as well as workers from different governorates engaged in various professions. Dry food items such as cheese, tahini, tuna, milk, and other canned goods will be procured and packed into bags for distribution.',
    'يهدف المشروع إلى توزيع الوجبات الجافة على الطلاب الدارسين في الجامعات الذين يعيشون بعيدًا عن أسرهم بالإضافة للعمال القادمين من المحافظات الأخرى ويعملون في مختلف المهن. سيتم شراء المواد الغذائية الجافة مثل الجبن والطحينية والتونة والحليب وبعض المعلبات الأخرى، وتعبئتها في أكياس جاهزة للتوزيع.',
    '/assets/mockimage.jpg',
    '#84CC16',
    'aid-project-distribution-dry-meals',
    'مشروع-إعانة-لتوزيع-الوجبات-الجافة',
    '[{"costTitleEn": "Monthly Cost", "costTitleAr": "التكلفة الشهرية", "costAmount": 10000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "monthly", "costPeriodAr": "شهريًا"}]',
    '[{"beneficiaryAmount": 500, "beneficiaryTargetEn": "individuals", "beneficiaryTargetAr": "فرد"}]',
    ARRAY['food aid', 'dry meals', 'students', 'workers', 'nutrition', 'monthly support'],
    ARRAY['مساعدة غذائية', 'وجبات جافة', 'طلاب', 'عمال', 'تغذية', 'دعم شهري'],
    ARRAY['food', 'aid', 'monthly'],
    ARRAY['غذاء', 'مساعدة', 'شهري'],
    true,
    NOW()
);

-- Project 19: Financial Aid Project for Displaced and Needy Families
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Financial Aid Project for Displaced and Needy Families',
    'مشروع العون المالي للأسر النازحة والمتعففة',
    'This project aims to provide monthly financial assistance to displaced families who have lost their sources of income due to the events that have unfolded in the country in recent years. 200 displaced families, providing each family with a monthly stipend of $100 for a duration of 6 months. This financial aid will assist families in covering essential living expenses such as rent, education, food, and clothing. These families are among the most severely affected by displacement, having lost their homes and livelihoods, embarking on a challenging and arduous journey of hardship.',
    'يهدف هذا المشروع إلى تقديم الدعم المالي الشهري للأسر النازحة التي فقدت مصادر دخلها بسبب الأحداث التي مرت بها البلاد خلال السنوات الماضية. يستهدف المشروع 200 أسرة نازحة، من خلال توزيع مبلغ 100 دولار شهريًا لكل أسرة لمدة 6 أشهر. حيث سيساعد هذا المبلغ الأسر على تغطية جزء من تكاليف المعيشة الأساسية مثل الإيجار والتعليم والطعام والكساء. وتُعد هذه الأسر من الفئات الأشد تضررًا جراء النزوح.',
    '/assets/mockimage.jpg',
    '#15803D',
    'financial-aid-project-displaced-needy-families',
    'مشروع-العون-المالي-للأسر-النازحة-والمتعففة',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 120000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "6 months", "costPeriodAr": "6 أشهر"}]',
    '[{"beneficiaryAmount": 200, "beneficiaryTargetEn": "families", "beneficiaryTargetAr": "أسرة"}]',
    ARRAY['financial aid', 'displaced', 'families', 'monthly support', 'living expenses', 'assistance'],
    ARRAY['مساعدة مالية', 'نازحة', 'أسر', 'دعم شهري', 'مصاريف معيشة', 'مساعدة'],
    ARRAY['financial', 'aid', 'families'],
    ARRAY['مالي', 'مساعدة', 'أسر'],
    true,
    NOW()
);

-- Project 20: Distribution of Shelter Materials for Displaced Families Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Distribution of Shelter Materials for Displaced Families Project',
    'مشروع توزيع المواد الإيوائية للأسر النازحة',
    'As part of our humanitarian efforts to support affected families in difficult circumstances, we are working in the shelter project to provide basic supplies to 800 families in the governorates of (Aden, Taiz, Marib, and Hadramout), as the project includes the distribution of blankets, mattresses, and kitchen utensils to improve their living conditions and provide their basic needs to live with dignity during the cold weather, and contribute to alleviating their suffering and enhancing their sense of security and stability. The displaced family in need will receive 2 mattresses + 2 blankets + various kitchen utensils at a cost of $120 per family.',
    'ضمن جهودنا الإنسانية لدعم الأسر المتضررة في ظل الظروف الصعبة، نعمل في مشروع الإيواء على توفير مستلزمات أساسية لـ800 أسرة في محافظات عدن، تعز، ومأرب، حيث يشمل المشروع توزيع بطانيات، فرش، وأدوات مطبخ لتحسين ظروف معيشتهم وتوفير احتياجاتهم الأساسية للعيش بكرامة خلال الأجواء الباردة، والمساهمة في تخفيف معاناتهم وتعزيز شعورهم بالأمان والاستقرار. ستحصل الأسرة النازحة المحتاجة على 2 فرش + 2 بطانيات + أدوات مطبخ متنوعة بتكلفة 120 دولار للأسرة.',
    '/assets/mockimage.jpg',
    '#9333EA',
    'distribution-shelter-materials-displaced-families',
    'مشروع-توزيع-المواد-الإيوائية-للأسر-النازحة',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 101325, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 800, "beneficiaryTargetEn": "families", "beneficiaryTargetAr": "أسرة"}]',
    ARRAY['shelter', 'displaced', 'families', 'mattresses', 'blankets', 'kitchen utensils', 'dignity'],
    ARRAY['إيواء', 'نازحة', 'أسر', 'فرش', 'بطانيات', 'أدوات مطبخ', 'كرامة'],
    ARRAY['shelter', 'displaced', 'dignity'],
    ARRAY['إيواء', 'نازحة', 'كرامة'],
    true,
    NOW()
);

-- Project 21: Rebuilding Hope Project - Completion and Finishing Orphanages
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'Rebuilding Hope Project: Completion and Finishing Orphanages',
    'مشروع إعادة بناء الأمل: استكمال وتشطيب منازل الأيتام',
    'The project aims to complete the construction and interior finishing works of homes for 10 orphan families in Marib Governorate, Yemen, who have lost their breadwinners due to the conflict. This initiative seeks to address the housing crisis and ensure stability for orphaned children living in precarious conditions.',
    'يهدف المشروع إلى استكمال أعمال البناء والتشطيبات الداخلية لمنازل 10 عوائل من الأيتام في محافظة مأرب باليمن، ممن فقدوا معيل الأسر نتيجة النزاع. ويسعى هذا المشروع للمساهمة في إيجاد حلول لأزمة السكن وضمان الاستقرار للأطفال الأيتام الذين وجدوا أنفسهم في ظروف محفوفة بالمخاطر.',
    '/assets/mockimage.jpg',
    '#C2410C',
    'rebuilding-hope-project-completion-finishing-orphanages',
    'مشروع-إعادة-بناء-الأمل-استكمال-وتشطيب-منازل-الأيتام',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 50000, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 10, "beneficiaryTargetEn": "orphan families", "beneficiaryTargetAr": "أسر أيتام"}]',
    ARRAY['housing', 'orphans', 'construction', 'finishing', 'hope', 'stability', 'children'],
    ARRAY['إسكان', 'أيتام', 'بناء', 'تشطيب', 'أمل', 'استقرار', 'أطفال'],
    ARRAY['housing', 'orphans', 'hope'],
    ARRAY['إسكان', 'أيتام', 'أمل'],
    true,
    NOW()
);

-- Project 22: School Social Workers Training Project
INSERT INTO projects (
    title_en,
    title_ar,
    description_en,
    description_ar,
    featured_image_url,
    color,
    slug_en,
    slug_ar,
    cost,
    beneficiaries,
    keywords_en,
    keywords_ar,
    tags_en,
    tags_ar,
    is_published,
    published_at
) VALUES (
    'School Social Workers Training Project',
    'مشروع تدريب الأخصائيين الاجتماعيين في المدارس',
    'The school social worker serves as a crucial liaison between students, their families, the school, and the community. They play a pivotal role in fostering the mental and social well-being of students, assisting them in overcoming challenges, and achieving optimal academic outcomes. This project aims to train 40 social workers across 40 displacement schools in Marib. The objective is to empower them to efficiently and effectively fulfill their duties, thereby improving the learning environment for students and enhancing their academic performance.',
    'يُعدّ الأخصائي الاجتماعي في المدرسة حلقة وصلٍ هامة بين الطالب وأسرته والمدرسة والمجتمع، فهو يلعب دورًا محوريًا في تعزيز الصحة النفسية والاجتماعية للطلاب، ومساعدتهم على التغلب على التحديات التي تواجههم، وتحقيق أفضل النتائج الأكاديمية. يهدف هذا المشروع إلى تدريب 40 أخصائي اجتماعي في 40 مدرسة من مدارس النزوح في مأرب، لتمكينهم من أداء واجباتهم بكفاءة وفعالية أكبر، وبما يساهم في تحسين بيئة التعلم للطلاب وتعزيز تحصيلهم الدراسي.',
    '/assets/mockimage.jpg',
    '#0F766E',
    'school-social-workers-training-project',
    'مشروع-تدريب-الأخصائيين-الاجتماعيين-في-المدارس',
    '[{"costTitleEn": "Total Project Cost", "costTitleAr": "التكلفة الإجمالية للمشروع", "costAmount": 7250, "costCurrencyEn": "USD", "costCurrencyAr": "دولار أمريكي", "costPeriodEn": "one-time", "costPeriodAr": "مرة واحدة"}]',
    '[{"beneficiaryAmount": 40, "beneficiaryTargetEn": "social workers", "beneficiaryTargetAr": "أخصائي"}]',
    ARRAY['education', 'social workers', 'training', 'schools', 'mental health', 'students', 'academic'],
    ARRAY['تعليم', 'أخصائيين اجتماعيين', 'تدريب', 'مدارس', 'صحة نفسية', 'طلاب', 'أكاديمي'],
    ARRAY['education', 'social', 'training'],
    ARRAY['تعليم', 'اجتماعي', 'تدريب'],
    true,
    NOW()
);

-- Commit the transaction
COMMIT;
