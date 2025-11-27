import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PaperPlaneIcon,
  FaceIcon,
  DotsVerticalIcon,
  CheckIcon,
  ClockIcon,
  TargetIcon,
  SewingPinFilledIcon,
  FileIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { Trash2, Ban, Flag, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/chat-sidebar";
import EmojiPicker from "emoji-picker-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getChatDetails, addMessageToChat } from "../data/mock-chat-data";

export default function ProjectChatPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Initial setup based on location state or defaults
  const initialChatId = location.state?.selectedOffer?.id || 1;
  const initialDetails = getChatDetails(initialChatId);

  const [selectedChat, setSelectedChat] = useState({
    id: initialChatId,
    name: location.state?.selectedOffer?.technician?.name || "أحمد محمد",
    avatar:
      location.state?.selectedOffer?.technician?.avatar ||
      "https://i.pravatar.cc/150?u=1",
    status: "online",
  });

  const [messages, setMessages] = useState(initialDetails.messages);

  // Prioritize passed projectData, fallback to mock
  const [projectData, setProjectData] = useState(
    location.state?.projectData || initialDetails.project
  );

  // Prioritize passed offerData (selectedOffer), fallback to mock
  const [offerData, setOfferData] = useState(
    location.state?.selectedOffer || initialDetails.offer
  );

  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Update data when selected chat changes
  useEffect(() => {
    if (selectedChat?.id) {
      // If we switched chats, we might want to load that chat's specific details
      // But if we are in the context of a specific project (passed via state),
      // we should probably keep the project details consistent.
      // For now, let's just load messages from mock DB.
      const details = getChatDetails(selectedChat.id);
      setMessages(details.messages);

      // Only update project/offer from mock if we DON'T have passed state
      // OR if the chat ID changed significantly (logic can be refined).
      // For this demo, if we have location.state.projectData, we keep it.
      if (!location.state?.projectData) {
        setProjectData(details.project);
      }

      if (!location.state?.selectedOffer) {
        setOfferData(details.offer);
      }
    }
  }, [selectedChat, location.state]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Handle Send Message
  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      type: "text",
      content: newMessage,
      time: new Date().toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add to mock DB and update state
    if (selectedChat?.id) {
      const updatedMessages = addMessageToChat(selectedChat.id, userMsg);
      setMessages([...updatedMessages]);
    } else {
      setMessages((prev) => [...prev, userMsg]);
    }

    setNewMessage("");
    setShowEmojiPicker(false);

    // Auto-reply Simulation
    setTimeout(() => {
      const replyMsg = {
        id: Date.now() + 1,
        sender: "other",
        type: "text",
        content: `رسالة تجريبية: شكراً لتواصلك، سأقوم بالرد عليك قريباً.`,
        time: new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      if (selectedChat?.id) {
        const updatedMessagesWithReply = addMessageToChat(
          selectedChat.id,
          replyMsg
        );
        setMessages([...updatedMessagesWithReply]);
      } else {
        setMessages((prev) => [...prev, replyMsg]);
      }
    }, 1500);
  };

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const reader = new FileReader();

    reader.onload = (event) => {
      const userMsg = {
        id: Date.now(),
        sender: "user",
        type: isImage ? "image" : "file",
        content: event.target.result,
        fileName: file.name,
        time: new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      if (selectedChat?.id) {
        const updatedMessages = addMessageToChat(selectedChat.id, userMsg);
        setMessages([...updatedMessages]);
      } else {
        setMessages((prev) => [...prev, userMsg]);
      }
    };

    reader.readAsDataURL(file);
    e.target.value = null; // Reset input
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "350px",
        "--sidebar-width-icon": "3rem",
        height: "calc(100vh - 4rem)",
      }}
      className="min-h-0! w-full bg-slate-50 dark:bg-slate-950 overflow-hidden"
      dir="rtl"
    >
      {/* Chat Sidebar */}
      <ChatSidebar
        selectedChatId={selectedChat.id}
        onSelectChat={(chat) => setSelectedChat(chat)}
      />

      <SidebarInset className="flex flex-1 flex-col md:flex-row overflow-hidden min-h-0! h-full ">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full min-h-0 relative overflow-hidden pt-0!">
          {/* Chat Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white dark:bg-slate-900 px-4 shadow-sm z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-mr-1 " />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>

            <div className="flex items-center gap-3 mr-2">
              <Avatar className="h-10 w-10 border-2 border-slate-100 dark:border-slate-800">
                <AvatarImage src={selectedChat.avatar} />
                <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-sm font-bold">{selectedChat.name}</h2>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedChat.status === "online"
                        ? "bg-green-500"
                        : "bg-slate-300"
                    }`}
                  ></span>
                  <span className="text-xs text-muted-foreground">
                    {selectedChat.status === "online"
                      ? "متصل الآن"
                      : "غير متصل"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mr-auto flex items-center gap-2">
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                  >
                    <DotsVerticalIcon className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Ban className="w-4 h-4" />
                    <span>حظر المستخدم</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Flag className="w-4 h-4" />
                    <span>الإبلاغ عن إساءة</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50 cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                    <span>حذف المحادثة</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Messages Area */}
          <ScrollArea
            ref={scrollAreaRef}
            className="flex-1 min-h-0 p-4 bg-slate-50/50 dark:bg-slate-950/50"
          >
            <div className="space-y-4 max-w-3xl mx-auto pb-4">
              {/* Date Divider */}
              <div className="flex justify-center my-4">
                <span className="text-xs bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full">
                  اليوم
                </span>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[80%] md:max-w-[70%] gap-2 ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="w-8 h-8 mt-1 border border-slate-200 dark:border-slate-700">
                      <AvatarImage
                        src={
                          msg.sender === "user"
                            ? "https://github.com/shadcn.png"
                            : selectedChat.avatar
                        }
                      />
                      <AvatarFallback>
                        {msg.sender === "user"
                          ? "ME"
                          : selectedChat.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div
                      className={`p-3 rounded-2xl text-sm shadow-sm ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none"
                      }`}
                    >
                      {msg.type === "text" && (
                        <p className="leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      )}
                      {msg.type === "image" && (
                        <div className="rounded-lg overflow-hidden mb-1">
                          <img
                            src={msg.content}
                            alt="Uploaded"
                            className="max-w-full h-auto"
                          />
                        </div>
                      )}
                      {msg.type === "file" && (
                        <div className="flex items-center gap-2 bg-black/10 dark:bg-white/10 p-2 rounded-lg mb-1">
                          <FileIcon className="w-5 h-5" />
                          <span className="text-xs truncate max-w-[150px]">
                            {msg.fileName}
                          </span>
                        </div>
                      )}

                      <div
                        className={`text-[10px] mt-1 flex items-center gap-1 ${
                          msg.sender === "user"
                            ? "text-primary-foreground/70 justify-end"
                            : "text-muted-foreground justify-start"
                        }`}
                      >
                        {msg.time}
                        {msg.sender === "user" && (
                          <CheckIcon className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-20 relative">
            {showEmojiPicker && (
              <div className="absolute bottom-full right-4 mb-2 z-50 shadow-xl rounded-xl border border-slate-200 dark:border-slate-800 [&_*::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  searchDisabled={true}
                  width={300}
                  height={400}
                />
              </div>
            )}
            <form
              onSubmit={handleSendMessage}
              className="max-w-3xl mx-auto flex items-center gap-2"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground hover:text-primary"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <FaceIcon className="w-6! h-6!" />
              </Button>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground hover:text-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="w-6! h-6!" />
              </Button>

              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 bg-slate-50 dark:bg-slate-800 border-0 focus-visible:ring-1 focus-visible:ring-primary/20"
              />

              <Button
                type="submit"
                size="icon"
                className="shrink-0 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                disabled={!newMessage.trim()}
              >
                <PaperPlaneIcon className="w-5 h-5 -rotate-90" />
              </Button>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex w-96 flex-col border-r bg-white dark:bg-slate-950 h-full">
          <ScrollArea className="flex-1" dir="rtl">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* Project Section */}
              <div className="p-5 space-y-4">
                <div className="flex  items-start justify-between gap-2">
                  <div className="text-right">
                    <Badge
                      variant={
                        projectData.status === "open" ? "outline" : "secondary"
                      }
                      className="mb-2"
                    >
                      {projectData.status === "open" ? "مفتوح" : "مغلق"}
                    </Badge>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug">
                      {projectData.title}
                    </h3>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-primary"
                    onClick={() => window.open("/project/summary", "_blank")}
                    title="عرض التفاصيل الكاملة"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-right">
                  <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-muted-foreground flex  items-center justify-start gap-1 mb-1">
                      <TargetIcon className="w-3 h-3" /> الميزانية
                    </span>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      {parseInt(projectData.budget).toLocaleString()} ر.س
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-muted-foreground flex  items-center justify-start gap-1 mb-1">
                      <ClockIcon className="w-3 h-3" /> المدة
                    </span>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      {projectData.duration} أيام
                    </p>
                  </div>

                  <div className="col-span-2 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 flex  items-center gap-2">
                    <SewingPinFilledIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">
                      {projectData.location.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Offer Section */}
              <div className="p-5 space-y-5">
                <div className="flex items-center justify-between ">
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <FileIcon className="w-4 h-4 text-primary" />
                    تفاصيل العرض
                  </h4>

                  <Badge
                    variant="secondary"
                    className={`text-[10px] h-5 border ${
                      offerData.status === "updated"
                        ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-100 dark:border-green-900"
                        : "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-900"
                    }`}
                  >
                    {offerData.status === "updated" ? "محدث" : "أولي"}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {/* Price */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-muted-foreground block text-right">
                      قيمة العرض
                    </span>

                    {offerData.status === "updated" ? (
                      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="text-center">
                          <span className="block text-sm font-bold text-green-600 dark:text-green-500">
                            {parseInt(offerData.price).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-green-600/70 dark:text-green-500/70">
                            الجديد
                          </span>
                        </div>

                        <div className="flex-1 px-2 flex justify-center">
                          <div className="w-full h-px bg-slate-200 dark:bg-slate-700 relative flex items-center justify-center">
                            <div className="bg-slate-200 dark:bg-slate-700 rounded-full p-0.5">
                              <CheckIcon className="w-3 h-3 text-muted-foreground" />
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <span className="block text-xs text-muted-foreground line-through decoration-red-400/50 decoration-2">
                            {parseInt(
                              offerData.originalPrice || offerData.price
                            ).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            السابق
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                        <span className="block text-lg font-bold text-slate-900 dark:text-slate-100">
                          {parseInt(offerData.price).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-muted-foreground block text-right">
                      مدة التنفيذ
                    </span>

                    {offerData.status === "updated" ? (
                      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="text-center">
                          <span className="block text-sm font-bold text-slate-900 dark:text-slate-100">
                            {offerData.duration} أيام
                          </span>
                        </div>

                        <div className="flex-1 px-2 flex justify-center">
                          <div className="w-full h-px bg-slate-200 dark:bg-slate-700 relative flex items-center justify-center">
                            <div className="bg-slate-200 dark:bg-slate-700 rounded-full p-0.5">
                              <ClockIcon className="w-3 h-3 text-muted-foreground" />
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <span className="block text-xs text-muted-foreground line-through decoration-red-400/50 decoration-2">
                            {offerData.originalDuration || offerData.duration}{" "}
                            أيام
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                        <span className="block text-lg font-bold text-slate-900 dark:text-slate-100">
                          {offerData.duration} أيام
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-muted-foreground block text-right">
                    ملاحظات
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed block text-right">
                    {offerData.description}
                  </p>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 h-11 rounded-xl font-bold"
                  onClick={() =>
                    navigate("/project/review", {
                      state: { projectData, offerData },
                    })
                  }
                >
                  <CheckIcon className="w-4 h-4 mr-2" />
                  {offerData.status === "updated"
                    ? "قبول العرض النهائي"
                    : "قبول العرض"}
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
