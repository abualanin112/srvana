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
  Pencil1Icon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { Trash2, Ban, Flag, Paperclip, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
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

  // New State for Edit Flow
  const [userRole, setUserRole] = useState("technician"); // 'client' | 'technician'
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);

  // Initialize edit form when offer data changes
  useEffect(() => {
    if (offerData) {
      setEditForm({
        price: offerData.price,
        duration: offerData.duration,
        description: offerData.description,
        answers: offerData.answers || [],
      });
    }
  }, [offerData]);

  const handleSaveOffer = () => {
    if (!editForm) return;

    const updates = {};
    let hasChanges = false;
    const changesList = [];

    // Check Price
    if (editForm.price !== offerData.price) {
      updates.price = editForm.price;
      updates.originalPrice = offerData.originalPrice || offerData.price;
      hasChanges = true;
      changesList.push("قيمة العرض");
    }

    // Check Duration
    if (editForm.duration !== offerData.duration) {
      updates.duration = editForm.duration;
      updates.originalDuration =
        offerData.originalDuration || offerData.duration;
      hasChanges = true;
      changesList.push("مدة التنفيذ");
    }

    // Check Description
    if (editForm.description !== offerData.description) {
      updates.description = editForm.description;
      hasChanges = true;
      if (!changesList.includes("تفاصيل العرض"))
        changesList.push("تفاصيل العرض");
    }

    // Check Answers
    const answersChanged =
      JSON.stringify(editForm.answers) !== JSON.stringify(offerData.answers);
    if (answersChanged) {
      updates.answers = editForm.answers;
      hasChanges = true;
      if (!changesList.includes("إجابات الأسئلة"))
        changesList.push("إجابات الأسئلة");
    }

    if (hasChanges) {
      const newOfferData = { ...offerData, ...updates, status: "updated" };
      setOfferData(newOfferData);
      setIsEditing(false);

      // Add System Message
      const systemMsg = {
        id: Date.now(),
        sender: "system",
        type: "text",
        content: `تم تعديل ${changesList.join(" و ")} بنجاح.`,
        time: new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, systemMsg]);
    } else {
      setIsEditing(false);
    }
  };

  // Update data when selected chat changes
  useEffect(() => {
    if (selectedChat?.id) {
      const details = getChatDetails(selectedChat.id);
      setMessages(details.messages);

      // Handle Project Data
      // Use state only if it matches the current context (initial load)
      // Otherwise fallback to DB
      if (
        location.state?.projectData &&
        location.state?.selectedOffer?.id === selectedChat.id
      ) {
        setProjectData(location.state.projectData);
      } else {
        setProjectData(details.project);
      }

      // Handle Offer Data
      // Merge DB answers if missing from state
      if (
        location.state?.selectedOffer &&
        location.state?.selectedOffer?.id === selectedChat.id
      ) {
        setOfferData({
          ...location.state.selectedOffer,
          answers:
            location.state.selectedOffer.answers || details.offer.answers || [],
        });
      } else {
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
      className="min-h-0! w-full bg-background overflow-hidden"
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
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-card px-4 shadow-sm z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-mr-1 " />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>

            <div className="flex items-center gap-3 mr-2">
              <Avatar className="h-10 w-10 border-2 border-border">
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
              {/* Offer Details Sheet Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden md:flex gap-2 bg-card hover:bg-muted border-primary/20 text-primary"
                  >
                    <FileIcon className="w-4 h-4" />
                    تفاصيل العرض
                  </Button>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-primary"
                  >
                    <FileIcon className="w-5 h-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-full sm:w-[400px] p-0 flex flex-col h-full bg-card border-r border-border"
                >
                  <SheetHeader className="p-6 border-b border-border text-right space-y-1 shrink-0">
                    <SheetTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                      <FileIcon className="w-5 h-5 text-primary" />
                      تفاصيل العرض والمشروع
                    </SheetTitle>
                    <div className="flex items-center justify-between gap-2 pt-2">
                      <Badge
                        variant={
                          projectData.status === "open"
                            ? "outline"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {projectData.status === "open" ? "مفتوح" : "مغلق"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs text-muted-foreground hover:text-primary p-0"
                        onClick={() =>
                          window.open("/project/summary", "_blank")
                        }
                      >
                        عرض المشروع كامل{" "}
                        <ExternalLinkIcon className="w-3 h-3 mr-1" />
                      </Button>
                    </div>
                  </SheetHeader>

                  <ScrollArea className="flex-1 min-h-0" dir="rtl">
                    <div className="p-6 space-y-6">
                      {/* Project Info */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-foreground border-r-4 border-primary pr-2">
                          معلومات المشروع
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-muted/50 p-3 rounded-xl border border-border">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1 mb-1">
                              <TargetIcon className="w-3 h-3" /> الميزانية
                            </span>
                            <p className="text-sm font-bold text-foreground">
                              {parseInt(projectData.budget).toLocaleString()}{" "}
                              ر.س
                            </p>
                          </div>
                          <div className="bg-muted/50 p-3 rounded-xl border border-border">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1 mb-1">
                              <ClockIcon className="w-3 h-3" /> المدة
                            </span>
                            <p className="text-sm font-bold text-foreground">
                              {projectData.duration} أيام
                            </p>
                          </div>
                          <div className="col-span-2 bg-muted/50 p-3 rounded-xl border border-border flex items-center gap-2">
                            <SewingPinFilledIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <p className="text-xs font-medium text-foreground">
                              {projectData.location.address}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-border" />

                      {/* Offer Info */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-foreground border-r-4 border-primary pr-2">
                            العرض المقدم
                          </h4>
                          <div className="flex items-center gap-2">
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
                        </div>

                        {/* Price & Duration */}
                        <div className="grid grid-cols-2 gap-3">
                          {/* Price */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] text-muted-foreground block">
                              قيمة العرض
                            </span>
                            {isEditing ? (
                              <Input
                                type="number"
                                value={editForm?.price || ""}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    price: e.target.value,
                                  })
                                }
                                className="h-9 text-center font-bold"
                              />
                            ) : offerData.status === "updated" ? (
                              <div className="bg-green-50/50 dark:bg-green-900/10 p-2.5 rounded-xl border border-green-100 dark:border-green-900/30 text-center">
                                <span className="block text-sm font-bold text-green-600 dark:text-green-500">
                                  {parseInt(offerData.price).toLocaleString()}
                                </span>
                                <span className="text-[10px] text-muted-foreground line-through opacity-70">
                                  {parseInt(
                                    offerData.originalPrice || offerData.price
                                  ).toLocaleString()}
                                </span>
                              </div>
                            ) : (
                              <div className="bg-muted/50 p-2.5 rounded-xl border border-border text-center">
                                <span className="block text-lg font-bold text-foreground">
                                  {parseInt(offerData.price).toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Duration */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] text-muted-foreground block">
                              مدة التنفيذ
                            </span>
                            {isEditing ? (
                              <Input
                                type="number"
                                value={editForm?.duration || ""}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    duration: e.target.value,
                                  })
                                }
                                className="h-9 text-center font-bold"
                              />
                            ) : offerData.status === "updated" ? (
                              <div className="bg-muted/50 p-2.5 rounded-xl border border-border text-center">
                                <span className="block text-sm font-bold text-foreground">
                                  {offerData.duration} أيام
                                </span>
                                <span className="text-[10px] text-muted-foreground line-through opacity-70">
                                  {offerData.originalDuration ||
                                    offerData.duration}{" "}
                                  أيام
                                </span>
                              </div>
                            ) : (
                              <div className="bg-muted/50 p-2.5 rounded-xl border border-border text-center">
                                <span className="block text-lg font-bold text-foreground">
                                  {offerData.duration} أيام
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Proposal Details (Text) */}
                        <div className="space-y-2">
                          <span className="text-xs font-medium text-muted-foreground block">
                            تفاصيل العرض النصي
                          </span>
                          {isEditing ? (
                            <Textarea
                              value={editForm?.description || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  description: e.target.value,
                                })
                              }
                              className="min-h-[100px] text-sm leading-relaxed"
                            />
                          ) : (
                            <div className="bg-muted/30 p-3 rounded-xl border border-border">
                              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                                {offerData.description}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Q&A Section */}
                      {(offerData.answers?.length > 0 || isEditing) && (
                        <>
                          <Separator className="bg-border" />
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold text-foreground border-r-4 border-primary pr-2">
                              أسئلة العميل وإجابات الفني
                            </h4>
                            <div className="space-y-3">
                              {(isEditing
                                ? editForm?.answers
                                : offerData.answers
                              )?.map((qa, idx) => (
                                <div
                                  key={idx}
                                  className="bg-muted/30 p-3 rounded-xl border border-border space-y-2"
                                >
                                  <div className="flex gap-2 items-start">
                                    <span className="text-primary font-bold text-xs shrink-0 mt-0.5">
                                      س:
                                    </span>
                                    <p className="text-xs font-medium text-foreground">
                                      {qa.question}
                                    </p>
                                  </div>
                                  <div className="flex gap-2 items-start w-full">
                                    <span className="text-green-600 font-bold text-xs shrink-0 mt-2.5">
                                      ج:
                                    </span>
                                    {isEditing ? (
                                      <Textarea
                                        value={qa.answer}
                                        onChange={(e) => {
                                          const newAnswers = [
                                            ...editForm.answers,
                                          ];
                                          newAnswers[idx] = {
                                            ...newAnswers[idx],
                                            answer: e.target.value,
                                          };
                                          setEditForm({
                                            ...editForm,
                                            answers: newAnswers,
                                          });
                                        }}
                                        className="text-xs min-h-[60px]"
                                      />
                                    ) : (
                                      <p className="text-xs text-muted-foreground mt-0.5">
                                        {qa.answer}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </ScrollArea>

                  <SheetFooter className="p-4 border-t border-border bg-card mt-auto shrink-0">
                    {userRole === "technician" ? (
                      <Button
                        className={`w-full h-12 rounded-xl font-bold text-base shadow-lg ${
                          isEditing
                            ? "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                            : "bg-card hover:bg-muted border border-primary/20 text-primary"
                        }`}
                        onClick={
                          isEditing ? handleSaveOffer : () => setIsEditing(true)
                        }
                      >
                        {isEditing ? (
                          <>
                            <Save className="w-5 h-5 mr-2" />
                            إرسال العرض
                          </>
                        ) : (
                          <>
                            <Pencil1Icon className="w-5 h-5 mr-2" />
                            تعديل العرض
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 h-12 rounded-xl font-bold text-base"
                        onClick={() =>
                          navigate("/project/review", {
                            state: { projectData, offerData },
                          })
                        }
                      >
                        <CheckIcon className="w-5 h-5 mr-2" />
                        {offerData.status === "updated"
                          ? "قبول العرض النهائي"
                          : "قبول العرض"}
                      </Button>
                    )}
                  </SheetFooter>
                </SheetContent>
              </Sheet>
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
            className="flex-1 min-h-0 p-4 bg-muted/50"
          >
            <div className="space-y-4 max-w-3xl mx-auto pb-4">
              {/* Date Divider */}
              <div className="flex justify-center my-4">
                <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
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
                    <Avatar className="w-8 h-8 mt-1 border border-border">
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
                          : "bg-card border border-border text-foreground rounded-tl-none"
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

          <div className="p-4 bg-card border-t border-border z-20 relative">
            {showEmojiPicker && (
              <div className="absolute bottom-full right-4 mb-2 z-50 shadow-xl rounded-xl border border-border [&_*::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                className="flex-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary/20"
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
      </SidebarInset>
    </SidebarProvider>
  );
}
