import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_DESKTOP = SCREEN_WIDTH >= 768;

// ─── Color Palette ─────────────────────────────────────────────────────────
const C = {
  bg:           '#0F1117',
  card:         '#13161E',
  cardAlt:      '#1A1D2B',
  border:       '#1E2130',
  accent:       '#3B6FE8',
  accentBg:     'rgba(59,111,232,0.15)',
  accentPurple: '#6C63FF',
  purpleBg:     '#2D2B6B',
  textPrimary:  '#E8ECF4',
  textMuted:    '#6B7280',
  textSub:      '#9CA3AF',
  green:        '#22C55E',
  greenBg:      'rgba(34,197,94,0.15)',
  orange:       '#F59E0B',
  orangeBg:     'rgba(245,158,11,0.15)',
  red:          '#EF4444',
  redBg:        'rgba(239,68,68,0.15)',
  white:        '#FFFFFF',
};

// ─── Circular Attendance Ring ───────────────────────────────────────────────
const AttendanceRing = ({ percent }) => (
  <View style={ring.wrap}>
    <View style={ring.outer}>
      <View style={ring.inner}>
        <Text style={ring.percent}>{percent}%</Text>
      </View>
    </View>
    <View style={styles.attendanceInfo}>
      <Text style={styles.attendanceLabel}>ATTENDANCE</Text>
      <Text style={styles.attendanceStatus}>On Track</Text>
    </View>
  </View>
);

const ring = StyleSheet.create({
  wrap:    { flexDirection: 'row', alignItems: 'center', gap: 10 },
  outer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 5,
    borderColor: C.accent,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(59,111,232,0.08)',
  },
  inner:   { alignItems: 'center', justifyContent: 'center' },
  percent: { fontSize: 13, fontWeight: '800', color: C.textPrimary },
});

// ─── Header ─────────────────────────────────────────────────────────────────
const Header = () => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <Text style={styles.welcomeText}>Welcome back, Alex</Text>
      <Text style={styles.headerSub}>Department of Computer Science & Engineering</Text>
      <Text style={styles.headerSub}>PRN: 242124005</Text>
    </View>
    <View style={styles.headerRight}>
      <AttendanceRing percent={88} />
      <TouchableOpacity activeOpacity={0.75} style={styles.iconBtn}>
        <View style={styles.notifDot} />
        <Text style={styles.iconBtnText}>🔔</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.75} style={styles.iconBtn}>
        <Text style={styles.iconBtnText}>🌙</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ─── Up Next Card ───────────────────────────────────────────────────────────
const UpNextCard = () => (
  <View style={[styles.card, styles.upNextCard]}>
    <View style={styles.upNextBadgeRow}>
      <View style={styles.upNextBadge}>
        <Text style={styles.upNextBadgeText}>UP NEXT</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.bookmarkIcon}>🔖</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.upNextTitle}>Advanced Algorithms</Text>
    <View style={styles.upNextMeta}>
      <Text style={styles.upNextMetaIcon}>🕐</Text>
      <Text style={styles.upNextMetaText}>10:30 AM - 12:00 PM</Text>
    </View>
    <View style={styles.upNextMeta}>
      <Text style={styles.upNextMetaIcon}>📍</Text>
      <Text style={styles.upNextMetaText}>Block C, Room 402</Text>
    </View>
    <TouchableOpacity activeOpacity={0.85} style={styles.joinBtn}>
      <Text style={styles.joinBtnText}>Join Session  →</Text>
    </TouchableOpacity>
  </View>
);

// ─── Assignments Due Card ────────────────────────────────────────────────────
const AssignmentRow = ({ icon, title, course, urgency, time, urgent }) => (
  <View style={styles.assignRow}>
    <View style={[styles.assignIcon, { backgroundColor: urgent ? C.redBg : C.orangeBg }]}>
      <Text style={styles.assignIconText}>{icon}</Text>
    </View>
    <View style={styles.assignInfo}>
      <Text style={styles.assignTitle}>{title}</Text>
      <Text style={styles.assignCourse}>{course}</Text>
    </View>
    <View style={styles.assignRight}>
      <Text style={[styles.assignUrgency, { color: urgent ? C.red : C.orange }]}>{urgency}</Text>
      <Text style={styles.assignTime}>{time}</Text>
    </View>
  </View>
);

const AssignmentsCard = () => (
  <View style={[styles.card, styles.assignmentsCard]}>
    <View style={styles.cardHeaderRow}>
      <Text style={styles.cardTitle}>Assignments Due</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    <AssignmentRow
      icon="📄" title="OS Final Project" course="CS-302 Operating Systems"
      urgency="2h Left" time="Today, 5 PM" urgent
    />
    <View style={styles.assignDivider} />
    <AssignmentRow
      icon="📋" title="Database Quiz II" course="CS-305 Databases"
      urgency="Tomorrow" time="11:00 AM"
    />
  </View>
);

// ─── AI Doubts Card ──────────────────────────────────────────────────────────
const AiDoubtsCard = () => (
  <View style={[styles.card, styles.aiCard]}>
    <View style={styles.aiIconWrap}>
      <Text style={styles.aiEmoji}>✨</Text>
    </View>
    <Text style={styles.aiTitle}>Stuck on a topic?</Text>
    <Text style={styles.aiSub}>Our AI Assistant is ready to help with your complex doubts.</Text>
    <TouchableOpacity activeOpacity={0.85} style={styles.askAiBtn}>
      <Text style={styles.askAiBtnText}>ASK AI NOW</Text>
    </TouchableOpacity>
  </View>
);

// ─── Subject Attendance Table ────────────────────────────────────────────────
const subjects = [
  { name: 'Data Structures',    lec: '45/50', prac: '18/20', pct: 90,  color: C.green },
  { name: 'Operating Systems',  lec: '38/42', prac: '14/15', pct: 91,  color: C.green },
  { name: 'Machine Learning',   lec: '32/40', prac: '16/20', pct: 80,  color: C.orange },
  { name: 'Advanced Algorithms',lec: '28/30', prac: '10/10', pct: 95,  color: C.green },
];

const SubjectAttendance = () => (
  <View style={[styles.card, styles.attendanceCard]}>
    <View style={styles.cardHeaderRow}>
      <View>
        <Text style={styles.cardTitle}>Subject Attendance</Text>
        <Text style={styles.cardSub}>Detailed breakdown of your attendance across subjects</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.viewAll}>Download Report</Text>
      </TouchableOpacity>
    </View>

    {/* Table Header */}
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderText, { flex: 2 }]}>SUBJECT NAME</Text>
      <Text style={styles.tableHeaderText}>LECTURE</Text>
      <Text style={styles.tableHeaderText}>PRACTICAL</Text>
      <Text style={styles.tableHeaderText}>PERCENTAGE</Text>
    </View>

    {subjects.map((s, i) => (
      <View key={i} style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 2, color: C.textPrimary, fontWeight: '500' }]}>{s.name}</Text>
        <Text style={styles.tableCell}>{s.lec}</Text>
        <Text style={styles.tableCell}>{s.prac}</Text>
        <View style={[styles.pctBadge, { backgroundColor: s.color === C.green ? C.greenBg : C.orangeBg }]}>
          <Text style={[styles.pctText, { color: s.color }]}>{s.pct}%</Text>
        </View>
      </View>
    ))}
  </View>
);

// ─── Achievements Card ───────────────────────────────────────────────────────
const badges = [
  { icon: '💡', name: 'Early Bird',   desc: '100% On-time submissions', bg: C.orangeBg,  iconColor: C.orange },
  { icon: '🧩', name: 'Solver',       desc: 'Solved 50+ AI Doubts',     bg: C.greenBg,   iconColor: C.green },
  { icon: '📈', name: 'Top Scorer',   desc: 'Top 5% in Algorithms',     bg: C.accentBg,  iconColor: C.accent },
  { icon: '👥', name: 'Team Lead',    desc: 'Led 3 group projects',      bg: 'rgba(108,99,255,0.15)', iconColor: C.accentPurple },
];

const AchievementsCard = () => (
  <View style={[styles.card, styles.achievementsCard]}>
    <View style={styles.cardHeaderRow}>
      <Text style={styles.cardTitle}>Achievements</Text>
      <Text style={styles.viewAll}>12 Total</Text>
    </View>
    <View style={styles.badgeGrid}>
      {badges.map((b, i) => (
        <TouchableOpacity key={i} activeOpacity={0.8} style={styles.badgeItem}>
          <View style={[styles.badgeIcon, { backgroundColor: b.bg }]}>
            <Text style={styles.badgeEmoji}>{b.icon}</Text>
          </View>
          <Text style={styles.badgeName}>{b.name}</Text>
          <Text style={styles.badgeDesc}>{b.desc}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <TouchableOpacity activeOpacity={0.8} style={styles.galleryBtn}>
      <Text style={styles.galleryBtnText}>View Badge Gallery</Text>
    </TouchableOpacity>
  </View>
);

// ─── Announcement Banner ─────────────────────────────────────────────────────
const AnnouncementBanner = () => (
  <View style={styles.announcement}>
    <Text style={styles.announcementIcon}>📢</Text>
    <View style={styles.announcementText}>
      <Text style={styles.announcementTitle}>New Campus Announcement</Text>
      <Text style={styles.announcementBody}>
        The library will be open 24/7 during the final examination week starting next Monday.
      </Text>
    </View>
    <TouchableOpacity activeOpacity={0.7}>
      <Text style={styles.dismissText}>Dismiss</Text>
    </TouchableOpacity>
  </View>
);

// ─── Main Dashboard ──────────────────────────────────────────────────────────
export default function Dashboardpage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        {/* Top Row Cards */}
        <View style={styles.topRow}>
          <UpNextCard />
          <AssignmentsCard />
          <AiDoubtsCard />
        </View>

        {/* Bottom Row */}
        <View style={styles.bottomRow}>
          <SubjectAttendance />
          <AchievementsCard />
        </View>

        {/* Announcement */}
        <AnnouncementBanner />

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: { flex: 1 },
  scrollContent: {
    padding: IS_DESKTOP ? 28 : 16,
    gap: 16,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 4,
  },
  headerLeft:   { flex: 1, minWidth: 180 },
  welcomeText:  { fontSize: IS_DESKTOP ? 26 : 20, fontWeight: '800', color: C.textPrimary, marginBottom: 4 },
  headerSub:    { fontSize: 13, color: C.textMuted, lineHeight: 18 },
  headerRight:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
  attendanceInfo: { alignItems: 'flex-start' },
  attendanceLabel:{ fontSize: 10, fontWeight: '700', color: C.textMuted, letterSpacing: 0.8 },
  attendanceStatus:{ fontSize: 13, fontWeight: '700', color: C.green, marginTop: 2 },

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconBtnText: { fontSize: 16 },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.red,
    borderWidth: 1.5,
    borderColor: C.bg,
    zIndex: 1,
  },

  // ── Shared Card ──
  card: {
    backgroundColor: C.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    padding: 20,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: IS_DESKTOP ? 'flex-start' : 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    flexWrap: 'wrap',
    gap: 6,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: C.textPrimary },
  cardSub:   { fontSize: 12, color: C.textMuted, marginTop: 3, maxWidth: 260 },
  viewAll:   { fontSize: 13, color: C.accent, fontWeight: '600' },

  // ── Layout Rows ──
  topRow: {
    flexDirection: IS_DESKTOP ? 'row' : 'column',
    gap: 14,
    alignItems: IS_DESKTOP ? 'stretch' : undefined,
  },
  bottomRow: {
    flexDirection: IS_DESKTOP ? 'row' : 'column',
    gap: 14,
    alignItems: IS_DESKTOP ? 'stretch' : undefined,
  },

  // ── Up Next Card ──
  upNextCard: {
    flex: IS_DESKTOP ? 1.2 : undefined,
    backgroundColor: '#1C2E6B',
    borderColor: 'rgba(59,111,232,0.3)',
    gap: 10,
  },
  upNextBadgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  upNextBadge: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  upNextBadgeText: { fontSize: 10, fontWeight: '700', color: C.textPrimary, letterSpacing: 1 },
  bookmarkIcon:    { fontSize: 18, opacity: 0.7 },
  upNextTitle:     { fontSize: IS_DESKTOP ? 20 : 17, fontWeight: '800', color: C.white },
  upNextMeta:      { flexDirection: 'row', alignItems: 'center', gap: 6 },
  upNextMetaIcon:  { fontSize: 13 },
  upNextMetaText:  { fontSize: 13, color: 'rgba(232,236,244,0.75)' },
  joinBtn: {
    marginTop: 6,
    backgroundColor: C.white,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  joinBtnText: { fontSize: 15, fontWeight: '700', color: '#1C2E6B' },

  // ── Assignments Card ──
  assignmentsCard: { flex: IS_DESKTOP ? 1.5 : undefined },
  assignRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  assignIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assignIconText: { fontSize: 18 },
  assignInfo:     { flex: 1 },
  assignTitle:    { fontSize: 13, fontWeight: '600', color: C.textPrimary },
  assignCourse:   { fontSize: 11, color: C.textMuted, marginTop: 2 },
  assignRight:    { alignItems: 'flex-end' },
  assignUrgency:  { fontSize: 12, fontWeight: '700' },
  assignTime:     { fontSize: 11, color: C.textMuted, marginTop: 2 },
  assignDivider:  { height: 1, backgroundColor: C.border, marginVertical: 12 },

  // ── AI Card ──
  aiCard: {
    flex: IS_DESKTOP ? 1 : undefined,
    backgroundColor: C.purpleBg,
    borderColor: 'rgba(108,99,255,0.3)',
    alignItems: 'center',
    gap: 8,
  },
  aiIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(108,99,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  aiEmoji:  { fontSize: 22 },
  aiTitle:  { fontSize: 16, fontWeight: '800', color: C.white, textAlign: 'center' },
  aiSub:    { fontSize: 12, color: 'rgba(232,236,244,0.65)', textAlign: 'center', lineHeight: 18 },
  askAiBtn: {
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  askAiBtnText: { fontSize: 13, fontWeight: '800', color: C.white, letterSpacing: 1 },

  // ── Subject Attendance Table ──
  attendanceCard: { flex: IS_DESKTOP ? 1.8 : undefined },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    marginBottom: 4,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 10,
    fontWeight: '700',
    color: C.textMuted,
    letterSpacing: 0.6,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(30,33,48,0.5)',
  },
  tableCell:  { flex: 1, fontSize: 13, color: C.textSub, textAlign: 'center' },
  pctBadge:   { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 6, paddingVertical: 4 },
  pctText:    { fontSize: 13, fontWeight: '700' },

  // ── Achievements Card ──
  achievementsCard: { flex: IS_DESKTOP ? 1 : undefined },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
  },
  badgeItem: {
    width: IS_DESKTOP ? '44%' : '44%',
    alignItems: 'center',
    gap: 6,
  },
  badgeIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeEmoji: { fontSize: 22 },
  badgeName:  { fontSize: 12, fontWeight: '700', color: C.textPrimary, textAlign: 'center' },
  badgeDesc:  { fontSize: 10, color: C.textMuted, textAlign: 'center', lineHeight: 14 },
  galleryBtn: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  galleryBtnText: { fontSize: 13, fontWeight: '600', color: C.textPrimary },

  // ── Announcement ──
  announcement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
  },
  announcementIcon: { fontSize: 22 },
  announcementText: { flex: 1 },
  announcementTitle: { fontSize: 13, fontWeight: '700', color: C.textPrimary },
  announcementBody:  { fontSize: 12, color: C.textMuted, marginTop: 2, lineHeight: 17 },
  dismissText:       { fontSize: 13, color: C.textMuted, fontWeight: '600' },
});