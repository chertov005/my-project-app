// "use client";

// import React, { useState } from 'react';
// import { 
//   Heart, 
//   ShoppingBag, 
//   User, 
//   Plus, 
//   MapPin, 
//   FileText, 
//   Zap, 
//   Sparkles,
//   CheckCircle2,
//   Package,
//   Edit3,
//   Trash2,
//   Bell,
//   LayoutDashboard,
//   Clock,
//   ExternalLink,
//   ChevronLeft,
//   PlusCircle
// } from "lucide-react";




// export default function ParsonalArea2({ name}) {
//   // 1. State Management
//   const [activeTab, setActiveTab] = useState('dashboard');

//   // 2. Data Arrays & Constants (All grouped together)
//   const userName = name;

//   const navigationTabs = [
//     { id: 'dashboard', label: 'סקירה', icon: <Zap size={14}/> },
//     { id: 'add-post', label: 'צור פוסט', icon: <PlusCircle size={14}/> },
//     { id: 'content', label: 'הפוסטים שלי', icon: <FileText size={14}/> },
//     { id: 'account', label: 'פרופיל', icon: <User size={14}/> }
//   ];

//   const wishlist = [
//     { id: 1, name: "Mechanical Keyboard", price: "₪899", brand: "Corsair" },
//     { id: 2, name: "OLED Monitor", price: "₪3,200", brand: "Samsung" },
//   ];

//   const recentOrders = [
//     { id: "#8821", date: "22.01.2024", item: "Logitech MX Master 3S", status: "בדרך", price: "₪450" },
//     { id: "#8819", date: "15.01.2024", item: "MacBook Pro M3", status: "נמסר", price: "₪12,500" },
//     { id: "#8790", date: "02.01.2024", item: "USB-C Hub", status: "נמסר", price: "₪180" },
//   ];

//   const myProducts = [
//     { id: 101, name: "iPhone 15 Pro", category: "Mobile", serial: "SN-9921-X", warranty: "בתוקף" },
//     { id: 102, name: "Sony WH-1000XM5", category: "Audio", serial: "SN-4432-A", warranty: "פג תוקף" },
//   ];

//   const posts = [
//     { id: 1, title: "Future of Web Design", date: "24.01.2024", likes: 128 },
//     { id: 2, title: "The Power of Framer Motion", date: "12.01.2024", likes: 85 },
//   ];

//   const quickShopItems = ["מתאם מסך", "מנורת שולחן"];

//   // 3. UI Render
//   return (
//     <div className="min-h-screen w-full bg-black text-white font-sans p-6 lg:p-10 relative overflow-hidden selection:bg-violet-500/30" dir="rtl">
      
//       {/* Background Orbs */}
//       <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

//       {/* Header */}
//       <header className="max-w-6xl mx-auto mb-16 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
//         <div className="flex flex-col gap-1 text-center md:text-right">
//           <div className="flex items-center justify-center md:justify-start gap-2 text-violet-400 font-black tracking-widest text-[10px] uppercase">
//             <Sparkles size={12} />
//             personal command space
//           </div>
//           <h1 className="text-4xl font-black tracking-tighter italic">האזור האישי</h1>
//         </div>

//         {/* Navigation Menu */}
//         <div className="flex flex-wrap justify-center bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 rounded-3xl md:rounded-full shadow-2xl">
//           {navigationTabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black transition-all duration-500 ${
//                 activeTab === tab.id 
//                 ? 'bg-white text-black shadow-xl scale-105' 
//                 : 'text-zinc-400 hover:text-white hover:bg-white/5'
//               }`}
//             >
//               {tab.icon}
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto relative z-10 pb-20">
        
//         {/* Dashboard View */}
//         {activeTab === 'dashboard' && (
//           <div className="animate-in fade-in duration-700 space-y-12">
//             <div className="mb-12 animate-in fade-in slide-in-from-right-4 duration-1000">
//               <div className="flex flex-col gap-6">
//                 <div className="flex items-center gap-3">
//                   <span className="text-violet-400 p-2 bg-violet-400/10 rounded-lg">
//                     <LayoutDashboard size={20}/>
//                   </span>
//                   <span className="text-xs md:text-sm tracking-widest text-zinc-400 opacity-80 font-bold uppercase">
//                     לוח בקרה אישי והעדפות אישיות
//                   </span>
//                 </div>
//                 <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic bg-gradient-to-l from-white to-zinc-500 bg-clip-text text-transparent">
//                   ברוך הבא, {userName}
//                 </h2> 
//                 <p className="text-lg md:text-xl tracking-tight text-zinc-400 border-r-2 border-violet-500/50 pr-6 py-2 max-w-2xl leading-relaxed">
//                   מרכז השליטה שלך פעיל. המערכת מנותחת ומותאמת אישית לביצועים המקסימליים שלך היום.
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//               <div className="lg:col-span-8 space-y-8">
//                 {/* Recent Orders */}
//                 <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-6 md:p-10 shadow-2xl">
//                   <div className="flex justify-between items-center mb-8">
//                     <h2 className="text-2xl font-black flex items-center gap-3">
//                       <Clock className="text-blue-400" size={22} />
//                       קניות אחרונות
//                     </h2>
//                     <button className="text-xs font-bold text-zinc-500 hover:text-white transition-colors">צפה בכל ההזמנות</button>
//                   </div>
                  
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-right min-w-[500px]">
//                       <thead>
//                         <tr className="text-zinc-500 text-[10px] uppercase tracking-widest border-b border-white/5">
//                           <th className="pb-4 font-black">מספר הזמנה</th>
//                           <th className="pb-4 font-black">מוצר</th>
//                           <th className="pb-4 font-black">סטטוס</th>
//                           <th className="pb-4 font-black">מחיר</th>
//                         </tr>
//                       </thead>
//                       <tbody className="text-sm">
//                         {recentOrders.map((order) => (
//                           <tr key={order.id} className="group border-b border-white/[0.03] last:border-0">
//                             <td className="py-5 font-mono text-zinc-400">{order.id}</td>
//                             <td className="py-5 font-bold group-hover:text-violet-400 transition-colors">{order.item}</td>
//                             <td className="py-5">
//                               <span className={`px-3 py-1 rounded-full text-[10px] font-black ${order.status === 'בדרך' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
//                                 {order.status}
//                               </span>
//                             </td>
//                             <td className="py-5 font-black">{order.price}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>

//                 {/* My Products */}
//                 <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-6 md:p-10 shadow-2xl">
//                   <div className="flex justify-between items-center mb-10">
//                     <h2 className="text-2xl font-black flex items-center gap-3">
//                       <Package className="text-amber-400" size={22} />
//                       המוצרים שלי
//                     </h2>
//                     <button className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-xs font-bold">
//                        <Plus size={16} /> רישום מוצר חדש
//                     </button>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {myProducts.map(product => (
//                       <div key={product.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] hover:bg-white/10 transition-all cursor-pointer group">
//                         <div className="flex justify-between items-start mb-4">
//                           <div className="p-3 bg-white/5 rounded-xl group-hover:bg-violet-500 group-hover:text-white transition-all">
//                              <Zap size={18} />
//                           </div>
//                           <ExternalLink size={14} className="text-zinc-600 group-hover:text-white" />
//                         </div>
//                         <h3 className="font-bold text-lg mb-1">{product.name}</h3>
//                         <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
//                           <span>{product.category}</span>
//                           <span className={product.warranty === 'בתוקף' ? 'text-emerald-400' : 'text-zinc-600'}>אחריות: {product.warranty}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Sidebar Info */}
//               <div className="lg:col-span-4 space-y-8">
//                 <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 shadow-2xl">
//                   <h2 className="text-xl font-black flex items-center gap-3 mb-8">
//                     <Heart className="text-rose-500" fill="currentColor" size={18} />
//                     משאלות
//                   </h2>
//                   <div className="space-y-4">
//                     {wishlist.map(item => (
//                       <div key={item.id} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/5 transition-all">
//                         <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🎁</div>
//                         <div className="flex-1">
//                            <p className="text-xs font-black">{item.name}</p>
//                            <p className="text-[10px] text-violet-400 font-bold italic">{item.price}</p>
//                         </div>
//                         <ChevronLeft size={16} className="text-zinc-600" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[3rem] p-10 shadow-2xl shadow-violet-900/20 group cursor-pointer overflow-hidden relative">
//                     <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                     <div className="flex justify-between items-start mb-8 text-white/50 group-hover:text-white/80 transition-colors relative z-10">
//                       <Bell size={24} />
//                     </div>
//                     <h3 className="text-4xl font-black italic mb-2 relative z-10">3</h3>
//                     <p className="text-sm font-bold text-white/60 relative z-10">עדכונים חדשים מאז הביקור האחרון</p>
//                 </div>

//                 <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10">
//                     <h4 className="font-black text-sm mb-6 flex items-center gap-2"><ShoppingBag size={18}/> קניות מהירות</h4>
//                     <div className="space-y-4">
//                       {quickShopItems.map((t, i) => (
//                         <div key={i} className="flex items-center gap-3 p-4 bg-black/20 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors">
//                           <div className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
//                           <span className="text-xs font-bold text-zinc-300">{t}</span>
//                         </div>
//                       ))}
//                     </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Create Post View */}
//         {activeTab === 'add-post' && (
//           <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
//              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-14">
//                 <div className="mb-10 text-center">
//                   <h2 className="text-4xl font-black italic mb-4">צור פוסט חדש</h2>
//                   <p className="text-zinc-400 text-sm">שתף את המחשבות שלך עם הקהילה בממשק נקי ומעוצב.</p>
//                 </div>
                
//                 <form className="space-y-8">
//                    <div className="space-y-2">
//                       <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">כותרת הפוסט</label>
//                       <input 
//                         type="text" 
//                         placeholder="מה הכותרת שלך?" 
//                         className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 font-bold text-lg focus:bg-white/10 focus:border-violet-500/50 transition-all outline-none"
//                       />
//                    </div>
                   
//                    <div className="space-y-2">
//                       <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">תוכן הפוסט</label>
//                       <textarea 
//                         rows={6}
//                         placeholder="כתוב כאן..."
//                         className="w-full bg-white/5 border border-white/5 rounded-3xl p-5 font-medium text-sm focus:bg-white/10 focus:border-violet-500/50 transition-all outline-none resize-none"
//                       />
//                    </div>

//                    <div className="flex flex-col md:flex-row gap-4 pt-4">
//                       <button type="button" className="flex-1 px-8 py-5 bg-white text-black font-black rounded-2xl text-xs hover:bg-violet-400 transition-all shadow-xl">
//                         פרסם עכשיו
//                       </button>
//                       <button type="button" onClick={() => setActiveTab('content')} className="px-8 py-5 bg-white/5 border border-white/10 text-zinc-400 font-black rounded-2xl text-xs hover:bg-white/10 hover:text-white transition-all">
//                         ביטול
//                       </button>
//                    </div>
//                 </form>
//              </div>
//           </div>
//         )}

//         {/* My Posts View */}
//         {activeTab === 'content' && (
//           <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-700">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {posts.map(post => (
//                 <div key={post.id} className="relative group overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 hover:border-violet-500/50 transition-all">
//                   <div className="flex justify-between items-start mb-16">
//                     <div className="p-4 bg-violet-500/10 rounded-2xl text-violet-400"><FileText size={24}/></div>
//                     <div className="flex gap-2">
//                       <button className="p-2 text-zinc-600 hover:text-white"><Edit3 size={18}/></button>
//                       <button className="p-2 text-zinc-600 hover:text-red-400"><Trash2 size={18}/></button>
//                     </div>
//                   </div>
//                   <h3 className="text-3xl font-black italic mb-6 leading-tight">{post.title}</h3>
//                   <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500 border-t border-white/5 pt-6">
//                     <span>{post.date}</span>
//                     <span className="flex items-center gap-2"><Heart size={12} className="text-rose-500"/> {post.likes} לייקים</span>
//                   </div>
//                 </div>
//               ))}
//               <div 
//                 onClick={() => setActiveTab('add-post')}
//                 className="border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center gap-4 text-zinc-600 hover:text-violet-400 hover:bg-white/5 transition-all cursor-pointer min-h-[300px] group"
//               >
//                 <div className="p-5 rounded-full border border-dashed border-zinc-700 group-hover:border-violet-500 group-hover:scale-110 transition-all">
//                   <Plus size={32} />
//                 </div>
//                 <span className="font-black text-xs uppercase tracking-widest italic">צור פוסט חדש</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Profile View */}
//         {activeTab === 'account' && (
//           <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
//              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
//                 <div className="flex flex-col md:flex-row gap-12 items-center md:items-start relative z-10">
//                    <div className="relative group">
//                       <div className="w-32 h-32 md:w-40 md:h-40 rounded-[3rem] md:rounded-[3.5rem] bg-gradient-to-br from-violet-500/30 to-blue-500/30 border border-white/10 flex items-center justify-center text-5xl md:text-6xl shadow-2xl">
//                          👤
//                       </div>
//                       <button className="absolute -bottom-2 -left-2 p-3 bg-white text-black rounded-2xl shadow-xl hover:scale-110 transition-transform">
//                         <Edit3 size={18} />
//                       </button>
//                    </div>
                   
//                    <div className="flex-1 space-y-10 w-full">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//                         <div className="space-y-3">
//                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">שם מלא</label>
//                            <input type="text" defaultValue="אבי כהן" className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] p-5 font-bold text-sm focus:bg-white/10 focus:border-violet-500/50 transition-all outline-none" />
//                         </div>
//                         <div className="space-y-3">
//                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">אימייל</label>
//                            <input type="email" defaultValue="avi@example.com" className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] p-5 font-bold text-sm opacity-40 cursor-not-allowed outline-none" readOnly />
//                         </div>
//                         <div className="md:col-span-2 space-y-3">
//                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">כתובת למשלוח</label>
//                            <div className="relative">
//                               <input type="text" defaultValue="הירקון 12, תל אביב" className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] p-5 font-bold text-sm focus:bg-white/10 focus:border-violet-500/50 transition-all outline-none" />
//                               <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
//                            </div>
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap gap-4 pt-4">
//                          <div className="flex items-center gap-3 px-6 py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-bold">
//                             <CheckCircle2 size={16} /> אימות דו-שלבי פעיל
//                          </div>
//                          <div className="flex items-center gap-3 px-6 py-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 text-xs font-bold">
//                             <Package size={16} /> חבר מועדון פלטינום
//                          </div>
//                       </div>

//                       <div className="flex justify-end pt-8">
//                         <button className="w-full md:w-auto px-12 py-5 bg-white text-black font-black rounded-[2rem] text-xs hover:bg-violet-400 transition-all shadow-xl">
//                           שמור שינויים
//                         </button>
//                       </div>
//                    </div>
//                 </div>
//              </div>
//           </div>
//         )}

//       </main>

//       <div className="fixed inset-0 pointer-events-none -z-10 opacity-20" 
//            style={{background: 'radial-gradient(circle at center, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 80%)'}}></div>
//     </div>
//   );
// }















'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion';

 import {    Heart,    ShoppingBag,    User,    Plus,    MapPin, 
  FileText,    Zap,    Sparkles,
  CheckCircle2,   Package,   Edit3,   Trash2,   Bell,   LayoutDashboard,   Clock,   ExternalLink,   ChevronLeft,   PlusCircle,  Settings2Icon ,
  BookDashed,
  View} from "lucide-react";


export default function ParsonalArea2({name}) {

  const[active , setActive] = useState('1')
  const[activeLastOrder , setActiveLastOrder] = useState('01')



  const navTabLinks = [

    {id:'1' ,name:'לוח בקרה אישי' , harf:'#'  ,icon:<LayoutDashboard className='size-5'/>} ,
    {id:'2' ,name:'הפוסטים שלי' , harf:'/posts'  ,icon:<FileText className='size-5'/>} ,
    {id:'3' ,name:'יצירת פוסט' , harf:'/edit'  ,icon:<Edit3 className='size-5'/>} ,
    {id:'4' ,name:'פרופיל משתמש' , harf:'/profile'  ,icon:<User className='size-5'/>} 

  ]

  const lastsOrder = [
    {id:'01' , date:'25.1.2026' ,itemName:'מחשב נייד אסוס' , price:'3800$' , status:'נמסר'}  ,
    {id:'02' , date:'22.1.2026' ,itemName:'מקלדת מכנית' , price:'330$' , status:'נמסר'}  ,
    {id:'03' , date:'21.1.2026' ,itemName:'מסך מחשב ' , price:'130$' , status:'בדרך'}  ,
    {id:'04' , date:'20.1.2026' ,itemName:' כרטיס מסך ' , price:'30$' , status:'נמסר'}  
  ]

  return (
    <div className='h-screen bg-linear-to-tr from-black to-violet-800/30 w-full overflow-auto flex flex-col pt-16 p-6' dir='rtl'>

      <div className='flex justify-between w-full'>

        <div className='flex flex-col gap-1'>
          <p className='flex items-center gap-2 tracking-widest font-bold text-xs xl:border-b '>החשבון שלי. הביצועים שלך  <span className=' text-violet-400'><Sparkles className='size-4'/> </span></p>
          <p className='text-3xl tracking-tighter font-bold text-shadow-2xs text-shadow-violet-100 p-2'>האזור האישי {name}</p>
        </div>

        <div className='grid grid-cols-1 2xl:grid-cols-4 gap-x-8 bg-white/20 px-4 rounded-xl'  >
          {navTabLinks?.map((item , i) => (
            <button onClick={() => setActive(item.id)} key={i} className={`w-full  gap-1 items-center p-1 border-r px-2  my-4 rounded text-zinc-400 duration-300 transition-all ${active === item.id ? 'bg-violet-400'  : 'hover:bg-white/5 duration-300'}`}>
              <div className='flex items-center gap-1 text-[10pt] font-bold tracking-widest '>
                <span className={`${active == item.id ? 'bg-white' : ''}`}>{item.icon}</span>
                <span className={`${active == item.id ? 'text-white' : 'text-zinc-400'}`}> {item.name}</span>
              </div>
            </button>
          ))}
        </div>

      </div>

      {
        active === '1'  && (

          <motion.div  className='w-full h-full'
          initial={{opacity:0 , y:20}}
          animate={{opacity:1 , y:0}}
          exit={{opacity:0}}
          transition={{duration:0.9, ease:'easeIn'}}
          >


                <div className='mt-20 flex flex-col gap-4 '>

        <div className='flex gap-2 items-center justify-center xl:justify-start'>
          <span><BookDashed/></span>
        <h4 className='text-white tracking-tighter font-bold text-2xl border-r p-2'>לוח בקרה אישי והעדפות אישיות</h4>
        </div>

        <div className='flex flex-col gap-4 items-center xl:items-start'>
          <h1 className='text-violet-400 tracking-tighter font-extralight text-4xl xl:text-6xl'>ברוך הבא , {name}</h1>
          <h2 className='text-sm font-bold tracking-widest w-[60%] text-shadow-2xs text-shadow-amber-100 '>מרכז השליטה שלך פעיל. המערכת מנותחת ומותאמת אישית לביצועים המקסימליים שלך היום.</h2>
        </div>

      </div>


      <div className='mt-20'>


        <div className='p-4 rounded-xl  shadow-md min-h-[400px] shadow-white/20 xl:w-[50%] flex flex-col bg-linear-to-br from-black to-violet-800/15 duration-500 hover:scale-100 hover:bg-linear-to-bl hover:from-black hover:to-violet-700/20 hover:duration-500 '>

        <div className='flex justify-between  p-4'>

          <div className='flex gap-2 items-center text-2xl tracking-tighter font-bold text-violet-400 opacity-65'>
            <span><Clock/></span>
            <p>נרכשו לאחרונה</p>
          </div>

          <div className='flex gap-2 items-center text-xs text-zinc-400 font-bold tracking-wider '>
          <span ><View className='size-4'/></span>
          <p>כל ההזמנות</p>
          </div>

        </div>



          <div  className='grid grid-cols-5 mt-10'>
            <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'>מספר הזמנה</p>
            <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'> תאריך הזמנה</p>
            <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'> שם המוצר</p>
            <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'> מחיר</p>
            <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'> סטטסוס</p>
          </div>

          <hr className='my-2' />

          <div className='w-full h-ful relative '>
            {lastsOrder?.map((item , i) => (
              <div key={i} onClick={() => setActiveLastOrder(item.id)}  className=' grid border-b grid-cols-5 my-4 text-zinc-400 hover:bg-white/10 duration-300 rounded p-1 cursor-pointer'>
                <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.id}</p>
                <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.date}</p>
                <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.itemName}</p>
                <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.price}</p>
                <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.status}</p>
                <span className={`${activeLastOrder === item.id  ? 'w-3 h-3 rounded-full bg-violet-400 animate-spin absolute left-0 mt-1' : ''}`}/>
              </div>
            ))}
          </div>


        </div>



      </div>




      </ motion.div>
        )
      }

    
      
    </div>
  )
}
