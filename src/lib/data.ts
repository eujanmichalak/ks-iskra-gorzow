export const LIVE_MATCH = {
  home: "Iskra Gorzów",
  away: "Przeciwnik",
  scoreHome: 0,
  scoreAway: 0,
  minute: 0,
  status: 'scheduled', // 'scheduled' | 'live' | 'break' | 'finished'
  location: 'Stadion Zawarcie',
  events: [] as { team: 'home' | 'away', min: number, player: string }[]
};

export const TEAM_STATS = {
  goalsScored: 54,
  goalsConceded: 12,
  yellowCards: 28,
  redCards: 2,
  avgAttendance: 240
};

export const RESULTS = [
  { id: 1, home: "Iskra Gorzów", away: "Zjednoczeni Przytoczna", sH: 3, sA: 0, date: "02.04" },
  { id: 2, home: "Celuloza Kostrzyn", away: "Iskra Gorzów", sH: 1, sA: 1, date: "26.03" },
  { id: 3, home: "Iskra Gorzów", away: "Polonia Słubice II", sH: 4, sA: 2, date: "19.03" },
];

export const NEWS = [
  { id: 1, title: "Wielkie derby na Zawarciu już w niedzielę!", date: "05.04.2024", category: "Mecz", img: "bg-red-500/10" },
  { id: 2, title: "Nowy sponsor strategiczny - Iskra rośnie w siłę", date: "01.04.2024", category: "Klub", img: "bg-blue-500/10" },
  { id: 3, title: "Zapisy do akademii: Szukamy młodych talentów!", date: "28.03.2024", category: "Akademia", img: "bg-slate-500/10" },
];

export const TOP_SCORERS = [
  {
    id: 1,
    name: "KOWALSKI",
    goals: 14,
    nozzle: "9",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/250px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
  },
  { id: 2, name: "NOWAK", goals: 11, nozzle: "10", img: "https://goldsaver.pl/blog/wp-content/uploads/2024/11/shutterstock_2480564705-1024x683.jpg" },
  { id: 3, name: "WIŚNIEWSKI", goals: 9, nozzle: "7", img: "https://hips.hearstapps.com/hmg-prod/images/cristiano-ronaldo-of-portugal-during-the-uefa-nations-news-photo-1748359673.pjpeg?crop=0.610xw:0.917xh;0.317xw,0.0829xh&resize=640:*" },
  { id: 4, name: "WÓJCIK", goals: 7, nozzle: "11", img: "https://bi.im-g.pl/im/8d/9d/1d/z31052941AMP,SOCCER-FRIENDLY-POR-IRL-REPORT.jpg" },
  { id: 5, name: "KAMIŃSKI", goals: 6, nozzle: "8", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSuuW7gcNIqC7gfK_2Q5hFMlKJqkeoyncQ1g&s" },
];

export const CLUB_NEWS = [
  {
    id: 1,
    title: "Wielkie zwycięstwo na Zawarciu!",
    excerpt: "Nasi zawodnicy pokazali charakter w ostatnim meczu domowym, wyrywając zwycięstwo w ostatnich minutach...",
    date: "12.05.2024",
    category: "Mecz",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Nowe stroje na sezon 2024/25",
    excerpt: "Prezentujemy oficjalne komplety meczowe. Czerwień Iskry jeszcze nigdy nie wyglądała tak dobrze...",
    date: "10.05.2024",
    category: "Klub",
    img: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Trening otwarty dla juniorów",
    excerpt: "Już w najbliższą sobotę zapraszamy wszystkich młodych adeptów piłki nożnej na wspólne zajęcia z pierwszą drużyną...",
    date: "08.05.2024",
    category: "Akademia",
    img: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1000&auto=format&fit=crop"
  }


];

// src/lib/data.ts

export interface TableRow {
    pos: number;
    team: string;
    p: number;          // Mecze
    pts: number;        // Punkty
    lastResult: string; // Ostatni wynik np. "0:0"
    isUs?: boolean;     // Czy to Iskra?
}

export const FULL_TABLE: TableRow[] = [
    { pos: 1, team: "ISKRA GORZÓW", p: 0, pts: 0, lastResult: "0:0", isUs: true },
    { pos: 2, team: "DRUŻYNA 02", p: 0, pts: 0, lastResult: "0:0" },
    { pos: 3, team: "DRUŻYNA 03", p: 0, pts: 0, lastResult: "0:0" },
    { pos: 4, team: "DRUŻYNA 04", p: 0, pts: 0, lastResult: "0:0" },
    { pos: 5, team: "DRUŻYNA 05", p: 0, pts: 0, lastResult: "0:0" },
];

