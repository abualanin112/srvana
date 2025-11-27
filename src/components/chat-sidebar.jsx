"use client";

import * as React from "react";
import {
  ArchiveX,
  Command,
  File,
  Inbox,
  Send,
  Trash2,
  MessageSquare,
  User,
  Phone,
  Ban,
  Flag,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

// Sample data for Chat Application
const data = {
  user: {
    name: "العميل",
    email: "client@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "المحادثات",
      url: "#",
      icon: MessageSquare,
      isActive: true,
    },
    {
      title: "جهات الاتصال",
      url: "#",
      icon: User,
      isActive: false,
    },
    {
      title: "المكالمات",
      url: "#",
      icon: Phone,
      isActive: false,
    },
  ],
  chats: [
    {
      id: 1,
      name: "أحمد محمد",
      avatar: "https://i.pravatar.cc/150?u=1",
      status: "online",
      lastMessage: "تمام، سأكون عندك غداً الساعة 10 صباحاً.",
      date: "09:34 ص",
      unread: 2,
    },
    {
      id: 2,
      name: "شركة البناء الحديث",
      avatar: "https://i.pravatar.cc/150?u=2",
      status: "offline",
      lastMessage: "تم إرسال عرض السعر الجديد، يرجى المراجعة.",
      date: "أمس",
      unread: 0,
    },
    {
      id: 3,
      name: "محمود علي",
      avatar: "https://i.pravatar.cc/150?u=3",
      status: "online",
      lastMessage: "هل يمكن توفير المواد الخام من طرفكم؟",
      date: "منذ يومين",
      unread: 0,
    },
    {
      id: 4,
      name: "سارة حسن",
      avatar: "https://i.pravatar.cc/150?u=4",
      status: "busy",
      lastMessage: "السلام عليكم، هل العرض ما زال متاحاً؟",
      date: "منذ 3 أيام",
      unread: 5,
    },
    {
      id: 5,
      name: "مؤسسة الإعمار",
      avatar: "https://i.pravatar.cc/150?u=5",
      status: "offline",
      lastMessage: "نعتذر عن التأخير، سيتم التواصل معكم قريباً.",
      date: "01/10/2023",
      unread: 0,
    },
    {
      id: 6,
      name: "المهندس عمر",
      avatar: "https://i.pravatar.cc/150?u=6",
      status: "online",
      lastMessage: "الرجاء إرسال المخططات الهندسية.",
      date: "09:15 ص",
      unread: 1,
    },
    {
      id: 7,
      name: "فني كهرباء - خالد",
      avatar: "https://i.pravatar.cc/150?u=7",
      status: "offline",
      lastMessage: "تم الانتهاء من التوصيلات الرئيسية.",
      date: "أمس",
      unread: 0,
    },
    {
      id: 8,
      name: "شركة النور",
      avatar: "https://i.pravatar.cc/150?u=8",
      status: "online",
      lastMessage: "عرض خاص لفترة محدودة على التشطيبات.",
      date: "منذ أسبوع",
      unread: 0,
    },
    {
      id: 9,
      name: "يوسف عبدالله",
      avatar: "https://i.pravatar.cc/150?u=9",
      status: "away",
      lastMessage: "سأتصل بك لاحقاً لمناقشة التفاصيل.",
      date: "10:30 ص",
      unread: 0,
    },
    {
      id: 10,
      name: "مكتب التصميم الراقي",
      avatar: "https://i.pravatar.cc/150?u=10",
      status: "online",
      lastMessage: "تم تحديث التصميم المبدئي بناءً على ملاحظاتكم.",
      date: "أمس",
      unread: 3,
    },
    {
      id: 11,
      name: "علي إبراهيم",
      avatar: "https://i.pravatar.cc/150?u=11",
      status: "offline",
      lastMessage: "شكراً جزيلاً.",
      date: "منذ يومين",
      unread: 0,
    },
    {
      id: 12,
      name: "ورشة النجارة",
      avatar: "https://i.pravatar.cc/150?u=12",
      status: "online",
      lastMessage: "الأبواب جاهزة للتركيب.",
      date: "08:00 ص",
      unread: 0,
    },
    {
      id: 13,
      name: "محمد سعيد",
      avatar: "https://i.pravatar.cc/150?u=13",
      status: "busy",
      lastMessage: "هل يمكن تأجيل الموعد لغد؟",
      date: "أمس",
      unread: 1,
    },
    {
      id: 14,
      name: "شركة السباكة الحديثة",
      avatar: "https://i.pravatar.cc/150?u=14",
      status: "offline",
      lastMessage: "تم إصلاح التسريب بالكامل.",
      date: "منذ 4 أيام",
      unread: 0,
    },
    {
      id: 15,
      name: "كريم عادل",
      avatar: "https://i.pravatar.cc/150?u=15",
      status: "online",
      lastMessage: "أنا في الطريق إليك.",
      date: "الآن",
      unread: 1,
    },
    {
      id: 16,
      name: "مؤسسة الألوان",
      avatar: "https://i.pravatar.cc/150?u=16",
      status: "offline",
      lastMessage: "كتالوج الألوان الجديد متاح الآن.",
      date: "منذ أسبوع",
      unread: 0,
    },
    {
      id: 17,
      name: "حسام حسن",
      avatar: "https://i.pravatar.cc/150?u=17",
      status: "online",
      lastMessage: "السعر شامل الضريبة.",
      date: "11:45 ص",
      unread: 0,
    },
    {
      id: 18,
      name: "شركة العزل",
      avatar: "https://i.pravatar.cc/150?u=18",
      status: "offline",
      lastMessage: "نحتاج لمعاينة الموقع أولاً.",
      date: "أمس",
      unread: 2,
    },
    {
      id: 19,
      name: "ماجد وليد",
      avatar: "https://i.pravatar.cc/150?u=19",
      status: "away",
      lastMessage: "سأرسل لك الفاتورة عبر الواتساب.",
      date: "منذ 3 أيام",
      unread: 0,
    },
    {
      id: 20,
      name: "فني تكييف - سامي",
      avatar: "https://i.pravatar.cc/150?u=20",
      status: "online",
      lastMessage: "المكيف يحتاج إلى صيانة دورية.",
      date: "09:00 ص",
      unread: 0,
    },
    {
      id: 21,
      name: "مكتب العقارات",
      avatar: "https://i.pravatar.cc/150?u=21",
      status: "offline",
      lastMessage: "يوجد شقة أخرى بنفس المواصفات.",
      date: "منذ شهر",
      unread: 0,
    },
    {
      id: 22,
      name: "زياد طارق",
      avatar: "https://i.pravatar.cc/150?u=22",
      status: "online",
      lastMessage: "موافق على العرض.",
      date: "أمس",
      unread: 0,
    },
    {
      id: 23,
      name: "شركة النقل",
      avatar: "https://i.pravatar.cc/150?u=23",
      status: "busy",
      lastMessage: "السيارة ستصل خلال ساعة.",
      date: "12:30 م",
      unread: 4,
    },
    {
      id: 24,
      name: "عمر فاروق",
      avatar: "https://i.pravatar.cc/150?u=24",
      status: "offline",
      lastMessage: "لا تنسى التقييم.",
      date: "منذ يومين",
      unread: 0,
    },
    {
      id: 25,
      name: "خدمة العملاء",
      avatar: "https://i.pravatar.cc/150?u=25",
      status: "online",
      lastMessage: "كيف يمكننا مساعدتك اليوم؟",
      date: "الآن",
      unread: 1,
    },
  ],
};

export function ChatSidebar({ onSelectChat, selectedChatId, ...props }) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const [chats, setChats] = React.useState(data.chats);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showUnreadOnly, setShowUnreadOnly] = React.useState(false);
  const { setOpen } = useSidebar();

  // Filter chats based on search query and unread status
  const filteredChats = chats.filter((chat) => {
    const matchesSearch = chat.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesUnread = showUnreadOnly ? chat.unread > 0 : true;
    return matchesSearch && matchesUnread;
  });

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden border-l h-full relative! bg-sidebar"
      side="right"
      variant="sidebar"
      {...props}
    >
      <SidebarHeader className="gap-3.5 border-b p-4 group-data-[collapsible=icon]:p-2">
        <div className="flex w-full items-center justify-between group-data-[collapsible=icon]:hidden">
          <div className="text-foreground text-base font-medium">
            {activeItem?.title}
          </div>
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <span>غير مقروء</span>
            <Switch
              className="shadow-none rotate-180"
              checked={showUnreadOnly}
              onCheckedChange={setShowUnreadOnly}
            />
          </Label>
        </div>
        <SidebarInput
          placeholder="بحث في المحادثات..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="group-data-[collapsible=icon]:hidden"
        />
        <div className="hidden group-data-[collapsible=icon]:flex justify-center">
          <MessageSquare className="w-6 h-6 text-muted-foreground" />
        </div>
      </SidebarHeader>
      <SidebarContent className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <SidebarGroup className="px-0 py-0 group-data-[collapsible=icon]:p-0">
          <SidebarGroupContent>
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <ContextMenu key={chat.id} dir="rtl">
                  <ContextMenuTrigger asChild>
                    <button
                      onClick={() => onSelectChat && onSelectChat(chat)}
                      className={`w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-start gap-3 border-b p-4 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center text-sm leading-tight text-right transition-colors ${
                        selectedChatId === chat.id ? "bg-sidebar-accent/50" : ""
                      }`}
                    >
                      <div className="relative shrink-0">
                        <Avatar>
                          <AvatarImage src={chat.avatar} />
                          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {chat.status === "online" && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>

                      <div className="flex flex-col items-start flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                        <div className="flex w-full items-center justify-between mb-1">
                          <span className="font-semibold">{chat.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {chat.date}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground line-clamp-2 text-right w-full">
                          {chat.lastMessage}
                        </span>
                      </div>

                      {chat.unread > 0 && (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:top-1 group-data-[collapsible=icon]:right-1">
                          {chat.unread}
                        </span>
                      )}
                    </button>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-48">
                    <ContextMenuItem className="gap-2 cursor-pointer">
                      <Ban className="w-4 h-4" />
                      <span>حظر المستخدم</span>
                    </ContextMenuItem>
                    <ContextMenuItem className="gap-2 cursor-pointer">
                      <Flag className="w-4 h-4" />
                      <span>الإبلاغ عن إساءة</span>
                    </ContextMenuItem>
                    <ContextMenuItem className="gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50 cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                      <span>حذف المحادثة</span>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm group-data-[collapsible=icon]:hidden">
                لا توجد نتائج
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
