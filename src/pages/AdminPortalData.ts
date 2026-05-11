import { Users, Fingerprint, ShieldCheck, Link2 } from "lucide-react";

export const stats = [
  { label: "Total Enrôlés", value: "550", sub: "Citoyens actifs", icon: Users, color: "jaune" },
  { label: "Passeport", value: "68%", sub: "Identifiés", icon: Fingerprint, color: "emerald" },
  { label: "NIP", value: "32%", sub: "Identifiés", icon: ShieldCheck, color: "gold" },
  { label: "Docs Certifiés", value: "1,480", sub: "Traités", icon: Link2, color: "emerald" },
];

export const sosCases = [
  {
    id: "sos-001",
    name: "Marie Ndong",
    location: "Kigali Centre",
    time: "Il y a 5 min",
    status: "active",
    bloodType: "A+",
    phone: "+250 780 111 003",
    emergency: "Jean Ndong (Père)",
    lat: -1.9403,
    lng: 29.8739,
    isStudent: true,
    passport: "GA-2022-11034",
    photo: null,
    created_at: "2026-03-31T10:25:00Z",
  },
  {
    id: "sos-002",
    name: "Paul Obame",
    location: "Nyamirambo",
    time: "Il y a 12 min",
    status: "responding",
    bloodType: "O-",
    phone: "+250 780 111 002",
    emergency: "Aline Obame (Sœur)",
    lat: -1.9756,
    lng: 30.0344,
    isStudent: true,
    passport: "GA-2023-04291",
    photo: null,
    created_at: "2026-03-31T10:18:00Z",
  },
  {
    id: "sos-003",
    name: "Aline Mba",
    location: "Musanze",
    time: "Il y a 1h",
    status: "resolved",
    bloodType: "B+",
    phone: "+250 780 111 005",
    emergency: "Stéphane Mba",
    lat: -1.4996,
    lng: 29.6344,
    isStudent: true,
    passport: "GA-2023-05518",
    photo: null,
    created_at: "2026-03-31T09:20:00Z",
  },
];

export const pendingDocuments = [
  {
    id: "doc-001",
    title: "Passeport - Renouvellement",
    citizen: "Marie Ndong",
    status: "pending",
    created_at: "2026-03-25",
    blockchain_hash: null,
    signed_at: null,
    type: "passeport",
  },
  {
    id: "doc-002",
    title: "Certificat de Naissance",
    citizen: "Paul Obame",
    status: "pending",
    created_at: "2026-03-22",
    blockchain_hash: null,
    signed_at: null,
    type: "certificat",
  },
  {
    id: "doc-003",
    title: "Licence ANBG",
    citizen: "Claire Nze",
    status: "flagged",
    created_at: "2026-03-19",
    blockchain_hash: "f7e6d5c4b3a29182736455463728192038475665748392010293847566758493",
    signed_at: "2026-03-20",
    type: "certificat",
  },
  {
    id: "doc-004",
    title: "Attestation Consulaire",
    citizen: "Brice Essono",
    status: "signed",
    created_at: "2026-03-18",
    blockchain_hash: "a3f2b8c1d4e5f6789012345678abcdef01234567890abcdef1234567890abcdef",
    signed_at: "2026-03-19",
    type: "attestation",
  },
];

export const checkinRecords = [
  { id: "chk-001", name: "Jean Moussavou", semester: "S1 2026", created_at: "2026-03-15", status: "pending", location: "Kigali" },
  { id: "chk-002", name: "Marie Ndong", semester: "S1 2026", created_at: "2026-03-14", status: "validated", location: "Kigali" },
  { id: "chk-003", name: "Paul Obame", semester: "S1 2026", created_at: "2026-03-13", status: "pending", location: "Huye" },
  { id: "chk-004", name: "Aline Mba", semester: "S1 2026", created_at: "2026-03-12", status: "flagged", location: "Musanze" },
  { id: "chk-005", name: "Claire Nze", semester: "S1 2026", created_at: "2026-03-11", status: "validated", location: "Kigali" },
];

export const auditLogs = [
  { id: "log-001", action: "Document signé", target_name: "Attestation Consulaire - Brice Essono", created_at: "2026-03-31T09:00:00Z", category: "documents" },
  { id: "log-002", action: "Admin créé", target_name: "Carine Nguema", created_at: "2026-03-31T08:40:00Z", category: "admin" },
  { id: "log-003", action: "SOS traité", target_name: "Paul Obame", created_at: "2026-03-31T08:10:00Z", category: "sos" },
  { id: "log-004", action: "Check-in validé", target_name: "Marie Ndong", created_at: "2026-03-30T17:20:00Z", category: "checkin" },
  { id: "log-005", action: "Message diffusé", target_name: "Tous les étudiants enregistrés", created_at: "2026-03-30T15:00:00Z", category: "messages" },
];

export const students = [
  { id: "cit-001", full_name: "Claire Nze", university: "University of Rwanda", program: "Master Informatique", location: "Kigali" },
  { id: "cit-002", full_name: "Paul Obame", university: "Kigali Independent University", program: "Licence Génie Civil", location: "Huye" },
  { id: "cit-003", full_name: "Marie Ndong", university: "AUCA", program: "MBA Finance", location: "Kigali" },
  { id: "cit-004", full_name: "Jean Moussavou", university: "University of Rwanda", program: "Médecine", location: "Huye" },
  { id: "cit-005", full_name: "Aline Mba", university: "CMU Kigali", program: "Licence Droit", location: "Musanze" },
  { id: "cit-006", full_name: "Brice Essono", university: "University of Rwanda", program: "Licence Informatique", location: "Kigali" },
];

export const geoData = [
  { city: "Kigali", count: 320, percent: 58, color: "jaune" },
  { city: "Huye", count: 140, percent: 25, color: "emerald" },
  { city: "Musanze", count: 90, percent: 17, color: "gold" },
];
