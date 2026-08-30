export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Learn', href: '/learn' },
] as const

export const CTA_LABEL = 'Sawaal pucho — free'

export const HOW_IT_WORKS = [
  {
    tag: 'SAMJHO',
    title: 'Apna credit score samjho.',
    body: 'ScoreUp har factor plain language mein samjhata hai — utilization, on-time payments aur account mix.',
  },
  {
    tag: 'SUDHARO',
    title: 'Har month thoda better.',
    body: 'Ek step-by-step plan jo seekhta hai kya cheez aapke score ko aage badhati hai — progress tezi pakadti hai.',
  },
  {
    tag: 'BACHAAO',
    title: 'Sasta loan, smart switch.',
    body: '40+ lenders ko real time scan karke ping karta hai jis pal ek cheaper switch milta hai.',
  },
] as const

export const SCORE_FACTORS = [
  { label: 'Credit utilisation', value: '22%', status: 'Healthy' },
  { label: 'Payment history', value: 'On time', status: 'Strong' },
  { label: 'Age of credit', value: '4.2 yrs', status: 'Growing' },
  { label: 'Hard inquiries', value: '3', status: 'Watch' },
] as const

export const TESTIMONIALS = [
  {
    quote:
      'Mera CIBIL 643 tha aur har bank reject kar raha tha. ScoreUp ne 90-din ka plan diya. Ab 731 pe hoon aur home loan 8.6% pe approve ho gaya.',
    name: 'Priya Sharma',
    city: 'Bengaluru',
    source: 'Play Store',
  },
  {
    quote:
      'Pata hi nahi tha personal loan 40% discount pe settle ho sakta hai. ScoreUp ne option dhoonda, process samjhaya, aur letter bhi draft kiya.',
    name: 'Rahul Mishra',
    city: 'Mumbai',
    source: 'Play Store',
  },
  {
    quote:
      'Pucha konsa credit card mere liye sahi hai. 11 cards compare karke ek chuna jo mere spending pe ₹3,200/mo cashback deta hai.',
    name: 'Ankita Joshi',
    city: 'Delhi',
    source: 'App Store',
  },
] as const

export const FAQS = [
  {
    q: 'Mera credit score kitna hona chahiye loan ke liye?',
    a: 'Zyadatar banks aur NBFCs ke liye 750+ score ideal hota hai — isse approval aasaan hoti hai aur interest rate bhi kam milta hai. 700–750 ke beech bhi loan mil sakta hai par thodi higher rate pe. ScoreUp batata hai aapka current score kis range mein hai aur use 750+ tak pahunchane ka plan deta hai.',
  },
  {
    q: 'Credit score check karne se score kam ho jaata hai kya?',
    a: 'Nahi. Jab aap khud apna score dekhte ho to woh ek "soft inquiry" hoti hai — usse score par koi asar nahi padta. Score sirf "hard inquiries" se thoda gir sakta hai, jab koi lender aapki application par report nikaalta hai.',
  },
  {
    q: 'Mera score 600 hai. Kya main isko 750 tak improve kar sakta hoon?',
    a: 'Bilkul. Zyadatar users 90 din mein 40–80 points ka jump dekhte hain. ScoreUp overdue clear karna, utilization kam karna aur on-time payments ka ek exact plan deta hai jo aapki report par based hota hai.',
  },
  {
    q: 'Score check karne ke liye kya charges hain?',
    a: 'Apna score check karna aur sawaal puchna bilkul free hai. Aapko koi card ya charge dene ki zaroorat nahi.',
  },
  {
    q: 'Maine kabhi bhi loan nahi liya. Mera score kya hoga?',
    a: 'Agar aapki koi credit history nahi hai to score "NH/NA" ya bahut low ho sakta hai. ScoreUp batata hai kaise ek secured card ya chhota EMI product se safe tarike se credit history build karein.',
  },
  {
    q: 'Meri report mein galat information hai. Kya main challenge kar sakta hoon?',
    a: 'Haan. Galat entry ko aap bureau ke saath dispute kar sakte ho. ScoreUp exact steps batata hai, dispute letter draft karne mein madad karta hai, aur follow-up track karta hai.',
  },
  {
    q: 'EMI miss ho gayi. Score kitna gir sakta hai?',
    a: 'Ek missed EMI 50–100 points tak gira sakti hai, lekin recovery possible hai. Jaldi payment clear karo aur agle mahino mein on-time raho — ScoreUp recovery timeline aur reminders set karta hai.',
  },
  {
    q: 'Kya ScoreUp ke saath mera data safe hai?',
    a: 'Haan. Data bank-grade encryption ke saath handle hota hai, sirf aapke score aur guidance ke liye use hota hai, aur kabhi bina permission ke share nahi hota.',
  },
] as const

export const FOOTER_LINKS = {
  PRODUCT: ['Score check', 'Loan switch', 'EMI & cashback', 'Insights'],
  COMPANY: ['About', 'Learn', 'Careers', 'Privacy'],
} as const
