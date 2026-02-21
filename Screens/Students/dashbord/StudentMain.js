import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_DESKTOP = SCREEN_WIDTH >= 768;
const DRAWER_WIDTH = 260;

// ─── Nav Items ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'ai_doubts', label: 'AI Doubts', icon: '🤖' },
  { id: 'chat',      label: 'Chat',      icon: '💬' },
  { id: 'profile',   label: 'Profile',   icon: '👤' },
];

// ─── Animated Nav Item ─────────────────────────────────────────────────────
const NavItem = ({ item, isActive, onPress, collapsed }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.94, useNativeDriver: true, speed: 50 }).start();

  const onPressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(item.id)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.navItem,
          isActive && styles.navItemActive,
          collapsed && styles.navItemCollapsed,
          { transform: [{ scale }] },
        ]}
      >
        <Text style={[styles.navIcon, isActive && styles.navIconActive]}>
          {item.icon}
        </Text>
        {!collapsed && (
          <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
            {item.label}
          </Text>
        )}
        {isActive && !collapsed && <View style={styles.activeDot} />}
      </Animated.View>
    </TouchableOpacity>
  );
};

// ─── Sidebar Content ───────────────────────────────────────────────────────
const SidebarContent = ({ activeTab, collapsed, onNavPress, onToggleCollapse, showCollapseBtn }) => (
  <View style={[styles.sidebar, collapsed && styles.sidebarCollapsed]}>
    {/* Logo */}
    <View style={[styles.logoRow, collapsed && styles.logoRowCollapsed]}>
      <View style={styles.logoIconBox}>
        <Text style={styles.logoEmoji}>🎓</Text>
      </View>
      {!collapsed && <Text style={styles.logoText}>Campus360</Text>}
      {showCollapseBtn && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.collapseBtn}
          onPress={onToggleCollapse}
        >
          <Text style={styles.collapseBtnText}>{collapsed ? '›' : '‹'}</Text>
        </TouchableOpacity>
      )}
    </View>

    <View style={styles.divider} />

    {/* Nav Items */}
    <View style={styles.navList}>
      {NAV_ITEMS.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          isActive={activeTab === item.id}
          onPress={onNavPress}
          collapsed={collapsed}
        />
      ))}
    </View>

    <View style={{ flex: 1 }} />
    <View style={styles.divider} />

    {/* User Footer */}
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.userFooter, collapsed && styles.userFooterCollapsed]}
      onPress={() => onNavPress('profile')}
    >
     
      {!collapsed && (
        <View style={styles.userMeta}>
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userRole}>Year 3 Student</Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
);

// ─── Hamburger Icon ────────────────────────────────────────────────────────
const HamburgerIcon = ({ onPress }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={styles.hamburgerBtn}
    onPress={onPress}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
  >
    <View style={styles.hamburgerLine} />
    <View style={styles.hamburgerLine} />
    <View style={styles.hamburgerLine} />
  </TouchableOpacity>
);

// ─── Mobile Drawer ─────────────────────────────────────────────────────────
const MobileDrawer = ({ activeTab, onNavPress, visible, onClose }) => {
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [rendered, setRendered] = useState(false);

  React.useEffect(() => {
    if (visible) {
      setRendered(true);
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
          speed: 20,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: -DRAWER_WIDTH,
          useNativeDriver: true,
          bounciness: 0,
          speed: 20,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => setRendered(false));
    }
  }, [visible]);

  if (!rendered) return null;

  return (
    <>
      {/* Dim Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
      </TouchableWithoutFeedback>

      {/* Sliding Drawer */}
      <Animated.View style={[styles.mobileDrawer, { transform: [{ translateX }] }]}>
        {/* Drawer Header */}
        <View style={styles.drawerHeader}>
          <View style={styles.mobileLogoRow}>
            <View style={styles.logoIconBox}>
              <Text style={styles.logoEmoji}>🎓</Text>
            </View>
            <Text style={styles.logoText}>Campus360</Text>
          </View>
          <TouchableOpacity
            style={styles.closeBtn}
            activeOpacity={0.7}
            onPress={onClose}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Nav Items */}
        <View style={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onPress={onNavPress}
              collapsed={false}
            />
          ))}
        </View>

        <View style={{ flex: 1 }} />
        <View style={styles.divider} />

        {/* User Footer */}
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.userFooter}
          onPress={() => onNavPress('profile')}
        >
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AJ</Text>
            </View>
            <View style={styles.onlineBadge} />
          </View>
          <View style={styles.userMeta}>
            <Text style={styles.userName}>Alex Johnson</Text>
            <Text style={styles.userRole}>Year 3 Student</Text>
          </View>
        </TouchableOpacity>

        {/* Bottom safe padding */}
        <View style={{ height: 20 }} />
      </Animated.View>
    </>
  );
};

// ─── Root Component ────────────────────────────────────────────────────────
export default function StudentMain({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('analytics');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavPress = (id) => {
    setActiveTab(id);
    onNavigate?.(id);
    if (!IS_DESKTOP) setMobileOpen(false);
  };

  /* ── Desktop ───────────────────────────────────────────────────────────── */
  if (IS_DESKTOP) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0F1117" />
        <View style={styles.desktopLayout}>
          <SidebarContent
            activeTab={activeTab}
            collapsed={false}
            onNavPress={handleNavPress}
            showCollapseBtn={false}
          />
          <View style={styles.mainContent}>
            <Text style={styles.placeholderText}>Main Content Area</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  /* ── Mobile ────────────────────────────────────────────────────────────── */
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#13161E" />

      {/* Top Bar */}
      <View style={styles.mobileTopBar}>
        <HamburgerIcon onPress={() => setMobileOpen(true)} />

        <View style={styles.mobileLogoRow}>
          <View style={styles.logoIconBox}>
            <Text style={styles.logoEmoji}>🎓</Text>
          </View>
          <Text style={styles.logoText}>Campus360</Text>
        </View>

        {/* Avatar shortcut on right */}
        
      </View>

      {/* Animated Drawer + Overlay */}
      <MobileDrawer
        activeTab={activeTab}
        onNavPress={handleNavPress}
        visible={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <View style={styles.mainContent}>
        <Text style={styles.placeholderText}>Main Content Area</Text>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────
const C = {
  bg:          '#0F1117',
  sidebar:     '#13161E',
  border:      '#1E2130',
  accent:      '#3B6FE8',
  accentBg:    'rgba(59,111,232,0.15)',
  textPrimary: '#E8ECF4',
  textMuted:   '#6B7280',
  white:       '#FFFFFF',
  green:       '#22C55E',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bg,
  },

  /* Desktop */
  desktopLayout: {
    flex: 1,
    flexDirection: 'row',
  },

  /* Sidebar */
  sidebar: {
    width: 220,
    height: '100%',
    backgroundColor: C.sidebar,
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRightWidth: 1,
    borderRightColor: C.border,
  },
  sidebarCollapsed: {
    width: 68,
    alignItems: 'center',
  },

  /* Logo */
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  logoRowCollapsed: {
    justifyContent: 'center',
    gap: 0,
    marginBottom: 16,
  },
  logoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: C.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: { fontSize: 18 },
  logoText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: C.textPrimary,
    letterSpacing: 0.2,
  },
  collapseBtn: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collapseBtnText: {
    color: C.textMuted,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },

  divider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 12,
    alignSelf: 'stretch',
  },

  /* Nav Items */
  navList: { gap: 4, paddingHorizontal: 4 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 12,
  },
  navItemActive:    { backgroundColor: C.accentBg },
  navItemCollapsed: { justifyContent: 'center', paddingHorizontal: 0, width: 40 },
  navIcon:          { fontSize: 17, opacity: 0.45 },
  navIconActive:    { opacity: 1 },
  navLabel:         { flex: 1, fontSize: 14, fontWeight: '500', color: C.textMuted },
  navLabelActive:   { color: C.accent, fontWeight: '600' },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.accent,
  },

  /* User Footer */
  userFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 4,
    paddingHorizontal: 8,
    paddingBottom: 4,
  },
  userFooterCollapsed: { justifyContent: 'center', gap: 0 },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText:  { fontSize: 13, fontWeight: '700', color: C.white },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: C.green,
    borderWidth: 2,
    borderColor: C.sidebar,
  },
  userMeta:  { flex: 1 },
  userName:  { fontSize: 13, fontWeight: '600', color: C.textPrimary },
  userRole:  { fontSize: 11, color: C.textMuted, marginTop: 1 },

  /* ── Mobile Top Bar ──────────────────────────────────────────────────── */
  mobileTopBar: {
    height: 58,
    backgroundColor: C.sidebar,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  mobileLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  /* Hamburger — three equal lines */
  hamburgerBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 6,
  },
  hamburgerLine: {
    width: 24,
    height: 2.5,
    backgroundColor: C.textPrimary,
    borderRadius: 2,
  },

  /* ── Mobile Animated Drawer ──────────────────────────────────────────── */
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.65)',
    zIndex: 10,
  },
  mobileDrawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: C.sidebar,
    zIndex: 20,
    borderRightWidth: 1,
    borderRightColor: C.border,
    paddingTop: 16,
    paddingHorizontal: 14,
    // subtle shadow on the right edge
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 16,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { color: C.textMuted, fontSize: 13, fontWeight: '700' },

  /* Main Content Placeholder */
  mainContent: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: { color: C.textMuted, fontSize: 16 },
});