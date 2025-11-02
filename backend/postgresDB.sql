--
-- PostgreSQL database dump
--

\restrict rZ6KfxAyfolmSCL2NuS97IDSLVuM3bRagZMR0Se4UxNBMzgwUzrwVc0U0sxxuJw

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-11-01 18:24:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5039 (class 1262 OID 5)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Chile.1252';


ALTER DATABASE postgres OWNER TO postgres;

\unrestrict rZ6KfxAyfolmSCL2NuS97IDSLVuM3bRagZMR0Se4UxNBMzgwUzrwVc0U0sxxuJw
\connect postgres
\restrict rZ6KfxAyfolmSCL2NuS97IDSLVuM3bRagZMR0Se4UxNBMzgwUzrwVc0U0sxxuJw

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 5039
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 235 (class 1259 OID 51846)
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    commentid bigint NOT NULL,
    likes integer NOT NULL,
    content character varying(500) NOT NULL,
    dislikes integer NOT NULL,
    date date NOT NULL,
    userid bigint NOT NULL,
    postid bigint NOT NULL
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 51843)
-- Name: comment_commentid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_commentid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comment_commentid_seq OWNER TO postgres;

--
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 232
-- Name: comment_commentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_commentid_seq OWNED BY public.comment.commentid;


--
-- TOC entry 234 (class 1259 OID 51845)
-- Name: comment_postid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_postid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comment_postid_seq OWNER TO postgres;

--
-- TOC entry 5042 (class 0 OID 0)
-- Dependencies: 234
-- Name: comment_postid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_postid_seq OWNED BY public.comment.postid;


--
-- TOC entry 233 (class 1259 OID 51844)
-- Name: comment_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comment_userid_seq OWNER TO postgres;

--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 233
-- Name: comment_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_userid_seq OWNED BY public.comment.userid;


--
-- TOC entry 239 (class 1259 OID 51897)
-- Name: commentvotes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.commentvotes (
    voteid bigint NOT NULL,
    commentid bigint NOT NULL,
    userid bigint NOT NULL,
    vote_type character varying(10),
    CONSTRAINT commentvotes_vote_type_check CHECK (((vote_type)::text = ANY ((ARRAY['like'::character varying, 'dislike'::character varying])::text[])))
);


ALTER TABLE public.commentvotes OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 51896)
-- Name: commentvotes_voteid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.commentvotes_voteid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.commentvotes_voteid_seq OWNER TO postgres;

--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 238
-- Name: commentvotes_voteid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.commentvotes_voteid_seq OWNED BY public.commentvotes.voteid;


--
-- TOC entry 226 (class 1259 OID 51766)
-- Name: educationalinstitution; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.educationalinstitution (
    eduid bigint NOT NULL,
    eduname character varying(255) NOT NULL,
    address character varying(255) NOT NULL
);


ALTER TABLE public.educationalinstitution OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 51765)
-- Name: educationalinstitution_eduid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.educationalinstitution_eduid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.educationalinstitution_eduid_seq OWNER TO postgres;

--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 225
-- Name: educationalinstitution_eduid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.educationalinstitution_eduid_seq OWNED BY public.educationalinstitution.eduid;


--
-- TOC entry 227 (class 1259 OID 51777)
-- Name: edutea; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.edutea (
    eduid bigint NOT NULL,
    teacherpageid bigint NOT NULL
);


ALTER TABLE public.edutea OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 51733)
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    postid bigint NOT NULL,
    userid bigint NOT NULL,
    title character varying(120) NOT NULL,
    content character varying(2000) NOT NULL,
    date date NOT NULL,
    likes integer NOT NULL,
    dislikes integer NOT NULL
);


ALTER TABLE public.post OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 51732)
-- Name: post_postid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_postid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_postid_seq OWNER TO postgres;

--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 221
-- Name: post_postid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_postid_seq OWNED BY public.post.postid;


--
-- TOC entry 231 (class 1259 OID 51818)
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    reviewid bigint NOT NULL,
    date date NOT NULL,
    dislikes integer NOT NULL,
    likes integer NOT NULL,
    content character varying(500) NOT NULL,
    teacherpageid bigint NOT NULL,
    userid bigint NOT NULL
);


ALTER TABLE public.review OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 51817)
-- Name: review_reviewid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.review_reviewid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.review_reviewid_seq OWNER TO postgres;

--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 230
-- Name: review_reviewid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.review_reviewid_seq OWNED BY public.review.reviewid;


--
-- TOC entry 241 (class 1259 OID 51920)
-- Name: reviewvotes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviewvotes (
    voteid bigint NOT NULL,
    reviewid bigint NOT NULL,
    userid bigint NOT NULL,
    vote_type character varying(10),
    CONSTRAINT reviewvotes_vote_type_check CHECK (((vote_type)::text = ANY ((ARRAY['like'::character varying, 'dislike'::character varying])::text[])))
);


ALTER TABLE public.reviewvotes OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 51919)
-- Name: reviewvotes_voteid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviewvotes_voteid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviewvotes_voteid_seq OWNER TO postgres;

--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 240
-- Name: reviewvotes_voteid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviewvotes_voteid_seq OWNED BY public.reviewvotes.voteid;


--
-- TOC entry 224 (class 1259 OID 51754)
-- Name: teacherpage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacherpage (
    teacherpageid bigint NOT NULL,
    name character varying(120) NOT NULL,
    content character varying(500) NOT NULL,
    profilepicture bytea
);


ALTER TABLE public.teacherpage OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 51753)
-- Name: teacherpage_teacherpageid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teacherpage_teacherpageid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.teacherpage_teacherpageid_seq OWNER TO postgres;

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 223
-- Name: teacherpage_teacherpageid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teacherpage_teacherpageid_seq OWNED BY public.teacherpage.teacherpageid;


--
-- TOC entry 229 (class 1259 OID 51795)
-- Name: teacherrating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacherrating (
    ratingid bigint NOT NULL,
    teachingpoliteness real NOT NULL,
    teachingquality real NOT NULL,
    teachingdifficulty real NOT NULL,
    userid bigint NOT NULL,
    teacherpageid bigint NOT NULL
);


ALTER TABLE public.teacherrating OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 51794)
-- Name: teacherrating_ratingid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teacherrating_ratingid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.teacherrating_ratingid_seq OWNER TO postgres;

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 228
-- Name: teacherrating_ratingid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teacherrating_ratingid_seq OWNED BY public.teacherrating.ratingid;


--
-- TOC entry 220 (class 1259 OID 51719)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid bigint NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    role integer NOT NULL,
    correo character varying(255),
    rut character varying(12),
    region character varying(100),
    district character varying(100),
    ismember boolean NOT NULL,
    profilepicture bytea
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 51718)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_userid_seq OWNER TO postgres;

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 237 (class 1259 OID 51874)
-- Name: votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.votes (
    voteid bigint NOT NULL,
    postid bigint NOT NULL,
    userid bigint NOT NULL,
    vote_type character varying(10),
    CONSTRAINT votes_vote_type_check CHECK (((vote_type)::text = ANY ((ARRAY['like'::character varying, 'dislike'::character varying])::text[])))
);


ALTER TABLE public.votes OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 51873)
-- Name: votes_voteid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.votes_voteid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.votes_voteid_seq OWNER TO postgres;

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 236
-- Name: votes_voteid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.votes_voteid_seq OWNED BY public.votes.voteid;


--
-- TOC entry 4812 (class 2604 OID 51849)
-- Name: comment commentid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN commentid SET DEFAULT nextval('public.comment_commentid_seq'::regclass);


--
-- TOC entry 4813 (class 2604 OID 51850)
-- Name: comment userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN userid SET DEFAULT nextval('public.comment_userid_seq'::regclass);


--
-- TOC entry 4814 (class 2604 OID 51851)
-- Name: comment postid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN postid SET DEFAULT nextval('public.comment_postid_seq'::regclass);


--
-- TOC entry 4816 (class 2604 OID 51900)
-- Name: commentvotes voteid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commentvotes ALTER COLUMN voteid SET DEFAULT nextval('public.commentvotes_voteid_seq'::regclass);


--
-- TOC entry 4809 (class 2604 OID 51769)
-- Name: educationalinstitution eduid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educationalinstitution ALTER COLUMN eduid SET DEFAULT nextval('public.educationalinstitution_eduid_seq'::regclass);


--
-- TOC entry 4807 (class 2604 OID 51736)
-- Name: post postid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post ALTER COLUMN postid SET DEFAULT nextval('public.post_postid_seq'::regclass);


--
-- TOC entry 4811 (class 2604 OID 51821)
-- Name: review reviewid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review ALTER COLUMN reviewid SET DEFAULT nextval('public.review_reviewid_seq'::regclass);


--
-- TOC entry 4817 (class 2604 OID 51923)
-- Name: reviewvotes voteid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviewvotes ALTER COLUMN voteid SET DEFAULT nextval('public.reviewvotes_voteid_seq'::regclass);


--
-- TOC entry 4808 (class 2604 OID 51757)
-- Name: teacherpage teacherpageid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacherpage ALTER COLUMN teacherpageid SET DEFAULT nextval('public.teacherpage_teacherpageid_seq'::regclass);


--
-- TOC entry 4810 (class 2604 OID 51798)
-- Name: teacherrating ratingid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacherrating ALTER COLUMN ratingid SET DEFAULT nextval('public.teacherrating_ratingid_seq'::regclass);


--
-- TOC entry 4806 (class 2604 OID 51722)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 4815 (class 2604 OID 51877)
-- Name: votes voteid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes ALTER COLUMN voteid SET DEFAULT nextval('public.votes_voteid_seq'::regclass);


--
-- TOC entry 5027 (class 0 OID 51846)
-- Dependencies: 235
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (commentid, likes, content, dislikes, date, userid, postid) FROM stdin;
1	5	Totalmente de acuerdo con tu publicación, gracias por compartir.	0	2024-01-16	2	1
2	8	Muy buenos consejos, los pondré en práctica este semestre.	1	2024-01-17	3	2
3	3	Yo también tuve ese problema, la solución está en el capítulo 3.	0	2024-01-18	4	3
4	12	Gracias por las recomendaciones, ya descargué algunos libros.	2	2024-01-19	5	4
5	7	Comparto tu experiencia, el primer año es un desafío grande.	1	2024-01-20	6	5
6	9	Uso la técnica pomodoro y me ha funcionado muy bien.	0	2024-01-21	7	6
7	4	Prepararse con tiempo es clave para los exámenes finales.	1	2024-01-22	8	7
8	15	Excelentes recursos, justo lo que necesitaba para practicar.	3	2024-01-23	9	8
9	2	Te recomiendo ver videos en YouTube sobre ese tema.	0	2024-01-24	10	9
10	11	Muy interesante tu proyecto, ¿podrías compartir más detalles?	1	2024-01-25	11	10
11	6	El miedo a hablar en público es común, gracias por los tips.	2	2024-01-26	12	11
12	13	Esas aplicaciones son geniales, especialmente para organizar tiempo.	1	2024-01-27	13	12
13	3	Las reacciones de sustitución son complicadas al principio.	0	2024-01-28	14	13
14	10	Tu rutina es muy similar a la mía, funciona excelente.	2	2024-01-29	15	14
15	17	Los cursos online han sido un gran complemento para mí también.	3	2024-01-30	16	15
16	4	Ese tema histórico es muy controversial, hay varias posturas.	1	2024-01-31	17	16
17	8	Tomar apuntes con colores mejora mucho la retención.	0	2024-02-01	18	17
18	7	Las tutorías me salvaron en cálculo el semestre pasado.	1	2024-02-02	19	18
19	19	Como programador, confirmo que esos recursos son los mejores.	4	2024-02-03	20	19
20	3	Los intervalos de confianza se entienden mejor con ejemplos prácticos.	0	2024-02-04	21	20
21	11	La técnica de loci es excelente para memorizar, la recomiendo.	2	2024-02-05	22	21
22	14	Aprendí inglés con métodos similares, funciona muy bien.	3	2024-02-06	23	22
23	5	Mitosis y meiosis se diferencian en la cantidad de divisiones.	1	2024-02-07	24	23
24	9	Practicar frente al espejo ayuda mucho para exámenes orales.	0	2024-02-08	25	24
25	16	Khan Academy tiene excelentes ejercicios de matemáticas.	2	2024-02-09	26	25
26	8	La educación online requiere mucha disciplina, coincido contigo.	4	2024-02-10	27	26
27	12	Organizar el tiempo es mi mayor desafío, gracias por los consejos.	1	2024-02-11	28	27
28	4	Gabriel García Márquez es un genio de la literatura.	0	2024-02-12	29	28
29	10	Leer con guía mejora mucho la velocidad y comprensión.	2	2024-02-13	30	29
30	13	Canva es excelente para diseño gráfico principiante.	1	2024-02-14	31	30
31	3	Los espacios vectoriales se entienden mejor con geometría.	0	2024-02-15	32	31
32	11	El método pomodoro me ha ayudado mucho con la concentración.	3	2024-02-16	33	32
33	7	Los trabajos grupales son un desafío de coordinación.	1	2024-02-17	34	33
34	15	Economía para todos es un libro excelente para empezar.	2	2024-02-18	35	34
35	5	La dialéctica es fundamental en filosofía hegeliana.	1	2024-02-19	36	35
36	13	Establecer metas pequeñas ayuda a mantener la motivación.	4	2024-02-20	37	36
37	8	Complete Anatomy es la mejor app para estudiar anatomía.	1	2024-02-21	38	37
38	4	La integración por partes requiere mucha práctica.	0	2024-02-22	39	38
39	10	Para exámenes test, es importante leer todas las opciones.	2	2024-02-23	40	39
40	14	Estudiar en el extranjero te da una perspectiva global única.	3	2024-02-24	1	40
41	8	Excelente publicación, justo lo que necesitaba leer hoy. Gracias por compartir tu experiencia.	1	2024-01-16	1	2
42	12	Totalmente de acuerdo con estos consejos, los he aplicado y mi rendimiento mejoró notablemente.	2	2024-01-18	1	4
43	5	Tuve el mismo problema la semana pasada, la solución está en revisar el teorema fundamental.	0	2024-01-19	1	3
44	15	Estos recursos son oro puro, especialmente para quienes estamos empezando en programación.	3	2024-01-20	1	8
45	7	Como estudiante de primer año, confirmo que la experiencia puede ser abrumadora al principio.	1	2024-01-21	1	5
46	9	La técnica pomodoro cambió completamente mi forma de estudiar, altamente recomendada.	0	2024-01-22	1	6
47	6	Prepararse con anticipación es clave, yo empecé 3 semanas antes del examen final.	2	2024-01-23	1	7
48	11	¿Podrías recomendar algún recurso específico para aprender alemán desde cero?	1	2024-01-24	1	8
49	4	Para ese concepto te recomiendo el canal de YouTube de "Ciencia Today", explican muy bien.	0	2024-01-25	1	9
50	18	Me encantó tu proyecto, ¿has considerado participar en ferias científicas?	2	2024-01-26	1	10
51	8	El miedo escénico es algo que todos enfrentamos, practicar frente a amigos ayuda mucho.	1	2024-01-27	1	11
52	14	Esas aplicaciones son esenciales para cualquier estudiante organizado.	3	2024-01-28	1	12
53	5	Las reacciones de sustitución nucleófila son las más comunes en química orgánica.	0	2024-01-29	1	13
54	13	Tu rutina es muy similar a la que uso, aunque yo agregaría descansos más largos.	2	2024-01-30	1	14
55	20	Coursera y edX tienen cursos excelentes de universidades top mundial.	4	2024-01-31	1	15
56	7	La guerra del Pacífico tuvo impactos económicos que duran hasta hoy.	1	2024-02-01	1	16
57	10	Tomar apuntes digitales me ha funcionado mejor que en papel.	0	2024-02-02	1	17
58	9	Las tutorías entre pares son muy efectivas y económicas.	2	2024-02-03	1	18
59	16	Como desarrollador junior, estos recursos me han ahorrado meses de aprendizaje.	3	2024-02-04	1	19
60	6	Los intervalos de confianza del 95% son los más usados en investigación.	1	2024-02-05	1	20
\.


--
-- TOC entry 5031 (class 0 OID 51897)
-- Dependencies: 239
-- Data for Name: commentvotes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.commentvotes (voteid, commentid, userid, vote_type) FROM stdin;
\.


--
-- TOC entry 5018 (class 0 OID 51766)
-- Dependencies: 226
-- Data for Name: educationalinstitution; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.educationalinstitution (eduid, eduname, address) FROM stdin;
1	Universidad de Chile	Av. Libertador Bernardo O Higgins 1058, Santiago
2	Pontificia Universidad Católica de Chile	Av. Bernardo O Higgins 340, Santiago
3	Universidad de Santiago de Chile	Av. Libertador Bernardo O Higgins 3363, Santiago
4	Universidad de Concepción	Victor Lamas 1290, Concepción
5	Universidad Técnica Federico Santa María	Av. España 1680, Valparaíso
6	Universidad de Valparaíso	Blanco 951, Valparaíso
7	Universidad Austral de Chile	Independencia 641, Valdivia
8	Universidad de La Serena	Raúl Bitrán 1305, La Serena
9	Universidad del Bío-Bío	Avenida Collao 1202, Concepción
10	Universidad de Talca	Avenida Lircay S/N, Talca
11	Universidad de Antofagasta	Av. Universidad de Antofagasta 02800, Antofagasta
12	Universidad de Atacama	Copayapu 485, Copiapó
13	Universidad de Tarapacá	General Velásquez 1775, Arica
14	Universidad de Magallanes	Av. Bulnes 01855, Punta Arenas
15	Universidad de La Frontera	Francisco Salazar 01145, Temuco
16	Universidad de Los Lagos	Fuchslocher 1305, Osorno
17	Universidad Arturo Prat	Av. Arturo Prat 2120, Iquique
18	Universidad Metropolitana de Ciencias de la Educación	José Pedro Alessandri 774, Santiago
19	Universidad Tecnológica Metropolitana	Diego Portales 1656, Santiago
20	Universidad Alberto Hurtado	Almirante Barroso 6, Santiago
21	Universidad Adolfo Ibáñez	Av. Padre Hurtado 750, Viña del Mar
22	Universidad de los Andes	Monseñor Álvaro del Portillo 12455, Santiago
23	Universidad del Desarrollo	Av. Plaza 680, Santiago
24	Universidad San Sebastián	Bellavista 7, Santiago
25	Universidad Andrés Bello	Av. República 252, Santiago
26	Universidad Central de Chile	Santa Isabel 1278, Santiago
27	Universidad Diego Portales	Av. Ejército 333, Santiago
28	Universidad Finis Terrae	Av. Pedro de Valdivia 1509, Santiago
29	Universidad Mayor	Camino La Pirámide 5750, Santiago
30	Universidad del Pacífico	Av. Las Condes 11121, Santiago
31	Instituto Nacional General José Miguel Carrera	Arturo Prat 33, Santiago
32	Liceo José Victorino Lastarria	Portugal 94, Santiago
33	Liceo Augusto D Halmar	Av. Tobalaba 1571, Santiago
34	Colegio San Ignacio El Bosque	Av. Pocuro 2800, Santiago
35	Colegio Los Andes	Av. Las Condes 12461, Santiago
36	Colegio Alemán de Santiago	Av. Las Condes 7351, Santiago
37	The Grange School	Av. Príncipe de Gales 6154, Santiago
38	Colegio Nuestra Señora del Rosario	Av. Tobalaba 1271, Santiago
39	Liceo Carmela Carvajal de Prat	Av. José Pedro Alessandri 541, Santiago
40	Colegio San Pedro Nolasco	Miraflores 920, Santiago
\.


--
-- TOC entry 5019 (class 0 OID 51777)
-- Dependencies: 227
-- Data for Name: edutea; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.edutea (eduid, teacherpageid) FROM stdin;
1	1
1	2
1	3
2	4
2	5
3	6
3	7
4	8
4	9
5	10
6	11
6	12
7	13
7	14
8	15
9	16
9	17
10	18
10	19
11	20
12	21
12	22
13	23
13	24
14	25
15	26
15	27
16	28
16	29
17	30
18	31
18	32
19	33
19	34
20	35
21	36
22	37
23	38
24	39
25	40
\.


--
-- TOC entry 5014 (class 0 OID 51733)
-- Dependencies: 222
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (postid, userid, title, content, date, likes, dislikes) FROM stdin;
1	1	Mi primera publicación	Hola a todos, esta es mi primera publicación en la plataforma.	2024-01-15	0	0
2	2	Consejos para estudiar	Comparto algunos consejos que me han funcionado para estudiar mejor.	2024-01-16	0	0
3	3	Problema con matemáticas	¿Alguien puede ayudarme con este ejercicio de cálculo?	2024-01-17	0	0
4	4	Recomendación de libros	Les recomiendo estos libros para aprender programación.	2024-01-18	0	0
5	5	Experiencia en la universidad	Comparto mi experiencia como estudiante de primer año.	2024-01-19	0	0
6	6	Técnicas de estudio	¿Qué técnicas de estudio utilizan ustedes?	2024-01-20	0	0
7	7	Preparación para exámenes	Cómo me preparo para los exámenes finales.	2024-01-21	0	0
8	8	Recursos gratuitos	Encontré estos recursos gratuitos para aprender idiomas.	2024-01-22	0	0
9	9	Duda sobre física	No entiendo este concepto de termodinámica, ayuda por favor.	2024-01-23	0	0
10	10	Mi proyecto de ciencias	Aquí está mi proyecto de ciencias sobre energías renovables.	2024-01-24	0	0
11	11	Consejos para presentaciones	Cómo superar el miedo a hablar en público.	2024-01-25	0	0
12	12	Aplicaciones útiles	Estas aplicaciones me han ayudado mucho en mis estudios.	2024-01-26	0	0
13	13	Problema con química orgánica	¿Alguien que me explique las reacciones de sustitución?	2024-01-27	0	0
14	14	Mi rutina de estudio	Así organizo mi tiempo para estudiar eficientemente.	2024-01-28	0	0
15	15	Recomendación de cursos online	Estos cursos online son excelentes para complementar estudios.	2024-01-29	0	0
16	16	Duda sobre historia	¿Cuál fue el impacto real de la guerra del pacífico?	2024-01-30	0	0
17	17	Consejos para tomar apuntes	Métodos efectivos para tomar buenos apuntes en clase.	2024-01-31	0	0
18	18	Mi experiencia con tutorías	Cómo las tutorías mejoraron mi rendimiento académico.	2024-02-01	0	0
19	19	Recursos para programadores	Los mejores recursos gratuitos para aprender a programar.	2024-02-02	0	0
20	20	Problema con estadística	No entiendo los intervalos de confianza, ayuda.	2024-02-03	0	0
21	21	Técnicas de memorización	Técnicas que uso para memorizar información importante.	2024-02-04	0	0
22	22	Mi método para aprender idiomas	Cómo aprendí inglés en 6 meses por mi cuenta.	2024-02-05	0	0
23	23	Duda sobre biología celular	¿Alguien puede explicarme la mitosis y meiosis?	2024-02-06	0	0
24	24	Consejos para exámenes orales	Cómo prepararse para exámenes orales y presentaciones.	2024-02-07	0	0
25	25	Recursos de matemáticas	Páginas web con ejercicios de matemáticas resueltos.	2024-02-08	0	0
26	26	Mi experiencia con educación online	Ventajas y desventajas de estudiar completamente online.	2024-02-09	0	0
27	27	Cómo organizar el tiempo	Métodos para organizar el tiempo entre estudio y trabajo.	2024-02-10	0	0
28	28	Duda sobre literatura	Análisis de Cien años de soledad, necesito ayuda.	2024-02-11	0	0
29	29	Consejos para leer más rápido	Técnicas que me ayudaron a mejorar mi velocidad de lectura.	2024-02-12	0	0
30	30	Recursos para diseño gráfico	Herramientas gratuitas para aprender diseño gráfico.	2024-02-13	0	0
31	31	Problema con álgebra lineal	No entiendo los espacios vectoriales, por favor ayuda.	2024-02-14	0	0
32	32	Mi método de estudio	El método pomodoro cambió mi forma de estudiar.	2024-02-15	0	0
33	33	Consejos para trabajos grupales	Cómo trabajar eficientemente en equipos de estudio.	2024-02-16	0	0
34	34	Recursos para economía	Libros y páginas para entender conceptos económicos.	2024-02-17	0	0
35	35	Duda sobre filosofía	¿Alguien que me explique el concepto de dialéctica?	2024-02-18	0	0
36	36	Cómo mantener la motivación	Estrategias para mantenerse motivado durante el semestre.	2024-02-19	0	0
37	37	Recursos de anatomía	Las mejores aplicaciones para estudiar anatomía humana.	2024-02-20	0	0
38	38	Problema con cálculo integral	Ejercicios de integración por partes que no entiendo.	2024-02-21	0	0
39	39	Consejos para exámenes tipo test	Cómo prepararse para exámenes de selección múltiple.	2024-02-22	0	0
40	40	Mi experiencia como estudiante internacional	Estudiando en el extranjero: desafíos y aprendizajes.	2024-02-23	0	0
\.


--
-- TOC entry 5023 (class 0 OID 51818)
-- Dependencies: 231
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review (reviewid, date, dislikes, likes, content, teacherpageid, userid) FROM stdin;
1	2024-01-15	2	15	Excelente profesor, explica muy claro y es muy paciente con los estudiantes.	1	1
2	2024-01-16	1	23	Las clases son muy dinámicas y entretenidas, aprendo mucho con ella.	2	2
3	2024-01-17	0	18	Buen profesor pero sus evaluaciones son bastante difíciles.	3	3
4	2024-01-18	3	25	Increíble metodología de enseñanza, recomiendo totalmente sus clases.	4	4
5	2024-01-19	2	20	Muy buen dominio del idioma, sus clases son muy productivas.	5	5
6	2024-01-20	1	17	Excelente trato con estudiantes con necesidades especiales.	6	6
7	2024-01-21	0	22	Domina completamente los temas de cálculo, explica muy bien.	7	7
8	2024-01-22	4	28	Sus análisis históricos son profundos y muy interesantes.	8	8
9	2024-01-23	1	19	Muy bueno enseñando programación, proyectos prácticos y útiles.	9	9
10	2024-01-24	2	21	Enseña música de forma creativa y motivadora.	10	10
11	2024-01-25	0	24	Excelente preparación para pruebas estandarizadas.	11	11
12	2024-01-26	3	26	Análisis literario muy detallado y enriquecedor.	12	12
13	2024-01-27	1	16	Muy buenas clases de educación física, siempre innovando.	13	13
14	2024-01-28	2	23	Explica biología celular de forma muy clara y organizada.	14	14
15	2024-01-29	0	20	Estadística se hace fácil con sus explicaciones.	15	15
16	2024-01-30	1	18	Profundiza en conceptos filosóficos de manera accesible.	16	16
17	2024-01-31	3	25	Excelente para aplicaciones prácticas de matemáticas.	17	17
18	2024-02-01	2	22	Metodologías de enseñanza muy modernas y efectivas.	18	18
19	2024-02-02	1	19	Química se vuelve interesante con sus clases.	19	19
20	2024-02-03	0	21	Explica anatomía con mucho detalle y paciencia.	20	20
21	2024-02-04	2	24	Muy bueno enseñando cálculo, resuelve muchas dudas.	21	21
22	2024-02-05	1	17	Historia del arte muy bien contextualizada.	22	22
23	2024-02-06	3	26	Economía aplicada a la vida real, muy útil.	23	23
24	2024-02-07	2	20	Excelente para mejorar la redacción académica.	24	24
25	2024-02-08	1	18	Enseña ciencias políticas de forma muy objetiva.	25	25
26	2024-02-09	0	23	Muy buena comprensión de psicología educacional.	26	26
27	2024-02-10	2	21	Álgebra se hace comprensible con sus métodos.	27	27
28	2024-02-11	1	19	Enfoque muy actual en temas ambientales.	28	28
29	2024-02-12	3	25	Domina completamente la física avanzada.	29	29
30	2024-02-13	2	22	Comunicación efectiva es su especialidad.	30	30
31	2024-02-14	1	17	Explica derecho de forma clara y práctica.	31	31
32	2024-02-15	0	20	Microbiología muy bien explicada con ejemplos.	32	32
33	2024-02-16	2	24	Hace la trigonometría fácil de entender.	33	33
34	2024-02-17	1	18	Enfoque sociológico muy interesante y actual.	34	34
35	2024-02-18	3	26	Electrónica explicada de forma práctica y sencilla.	35	35
36	2024-02-19	2	21	Literatura comparada muy bien enseñada.	36	36
37	2024-02-20	1	19	Contabilidad muy bien estructurada en sus clases.	37	37
38	2024-02-21	0	22	Bioquímica compleja hecha comprensible.	38	38
39	2024-02-22	2	24	Ecuaciones diferenciales explicadas paso a paso.	39	39
40	2024-02-23	1	20	Pedagogía teatral muy innovadora y entretenida.	40	40
41	2024-01-15	2	15	El profesor González transformó mi visión de las matemáticas. Sus explicaciones son claras y siempre está dispuesto a ayudar fuera de horario.	1	1
42	2024-01-18	1	23	La profesora Martínez tiene una metodología única para enseñar literatura. Hace que los clásicos sean relevantes para nuestra época.	2	1
43	2024-01-20	0	18	El profesor Silva hace que la química sea fascinante. Sus experimentos en clase son seguros pero muy ilustrativos.	3	1
44	2024-01-22	3	25	Increíble cómo la profesora Rodríguez contextualiza la historia. No solo memorizamos fechas, entendemos procesos históricos.	4	1
45	2024-01-24	2	20	El profesor López me preparó para el IELTS y obtuve band 8.0. Su método de enseñanza es muy estructurado y efectivo.	5	1
46	2024-01-26	1	17	La profesora Pérez tiene una paciencia infinita y adapta sus métodos a cada estudiante. Excelente para necesidades especiales.	6	1
47	2024-01-28	0	22	El profesor Torres domina el cálculo multivariable como nadie. Sus ejemplos del mundo real hacen que todo tenga sentido.	7	1
48	2024-01-30	4	28	La profesora Díaz enseña sociología con pasión. Sus análisis de la realidad chilena son profundos y bien fundamentados.	8	1
49	2024-02-01	1	19	El profesor Vargas me enseñó Python en 3 meses. Sus proyectos prácticos son perfectos para construir portafolio.	9	1
50	2024-02-03	2	21	La profesora Núñez hace que la música sea accesible para todos. Nunca pensé que podría tocar guitarra, pero ahora lo hago.	10	1
51	2024-02-05	0	24	El profesor Herrera tiene un don para explicar física compleja. Sus analogías hacen que conceptos abstractos sean comprensibles.	11	1
52	2024-02-07	3	26	La profesora Castro analiza literatura con una profundidad increíble. Sus clases son como viajes en el tiempo.	12	1
53	2024-02-09	1	16	El profesor Ortiz hace que el ejercicio sea divertido. Sus rutinas son variadas y se adaptan a todos los niveles.	13	1
54	2024-02-11	2	23	La profesora Ríos explica biología molecular con una claridad excepcional. Sus diagramas son obras de arte.	14	1
55	2024-02-13	0	20	El profesor Mora hace que la estadística no dé miedo. Sus ejemplos con datos reales son muy ilustrativos.	15	1
56	2024-02-15	1	18	La profesora Paredes enseña filosofía conectándola con problemas actuales. Muy relevante para los jóvenes.	16	1
57	2024-02-17	3	25	El profesor Salazar aplica matemáticas a problemas de ingeniería reales. Perfecto para quienes quieren aplicar conocimientos.	17	1
58	2024-02-19	2	22	La profesora Cordero conoce todas las metodologías pedagógicas modernas. Muy útil para futuros profesores.	18	1
59	2024-02-21	1	19	El profesor Figueroa hace que la química orgánica sea sistemática y predecible. Sus reglas mnemotécnicas son geniales.	19	1
60	2024-02-23	0	21	La profesora Leiva enseña anatomía con modelos 3D que facilitan mucho el aprendizaje. Muy innovadora.	20	1
\.


--
-- TOC entry 5033 (class 0 OID 51920)
-- Dependencies: 241
-- Data for Name: reviewvotes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviewvotes (voteid, reviewid, userid, vote_type) FROM stdin;
\.


--
-- TOC entry 5016 (class 0 OID 51754)
-- Dependencies: 224
-- Data for Name: teacherpage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teacherpage (teacherpageid, name, content, profilepicture) FROM stdin;
1	El Profe Bacan	Especialista en matemáticas y física con 15 años de experiencia.	\N
2	Profesora Martínez	Docente de lenguaje y comunicación, enfocada en comprensión lectora.	\N
3	Profesor Silva	Experto en química y biología, metodología práctica y entretenida.	\N
4	Profesora Rodríguez	Especialista en historia y geografía, clases dinámicas y participativas.	\N
5	Profesor López	Docente de inglés avanzado y preparación para certificaciones internacionales.	\N
6	Profesora Pérez	Especialista en educación diferencial y necesidades educativas especiales.	\N
7	Profesor Torres	Experto en cálculo y álgebra lineal para educación superior.	\N
8	Profesora Díaz	Docente de ciencias sociales con enfoque en análisis crítico.	\N
9	Profesor Vargas	Especialista en programación y tecnologías de la información.	\N
10	Profesora Núñez	Docente de música y artes, metodología creativa e innovadora.	\N
11	Profesor Herrera	Experto en física universitaria y preparación para la PSU.	\N
12	Profesora Castro	Especialista en literatura hispanoamericana y análisis literario.	\N
13	Profesor Ortiz	Docente de educación física y vida saludable.	\N
14	Profesora Ríos	Experta en biología celular y molecular.	\N
15	Profesor Mora	Especialista en estadística y probabilidades.	\N
16	Profesora Paredes	Docente de filosofía y ética profesional.	\N
17	Profesor Salazar	Experto en ingeniería y matemáticas aplicadas.	\N
18	Profesora Cordero	Especialista en pedagogía y metodologías de enseñanza.	\N
19	Profesor Figueroa	Docente de química orgánica e inorgánica.	\N
20	Profesora Leiva	Experta en anatomía y fisiología humana.	\N
21	Profesor Miranda	Especialista en cálculo diferencial e integral.	\N
22	Profesora Vega	Docente de historia del arte y apreciación artística.	\N
23	Profesor Guzmán	Experto en economía y finanzas personales.	\N
24	Profesora Soto	Especialista en gramática y redacción académica.	\N
25	Profesor Campos	Docente de ciencias políticas y relaciones internacionales.	\N
26	Profesora Muñoz	Experta en psicología educacional y desarrollo infantil.	\N
27	Profesor Contreras	Especialista en álgebra y geometría analítica.	\N
28	Profesora Zúñiga	Docente de ecología y ciencias ambientales.	\N
29	Profesor Tapia	Experto en termodinámica y electromagnetismo.	\N
30	Profesora Arias	Especialista en lingüística y comunicación efectiva.	\N
31	Profesor Pino	Docente de derecho constitucional y civil.	\N
32	Profesora Sepúlveda	Experta en microbiología y genética.	\N
33	Profesor Maldonado	Especialista en trigonometría y precálculo.	\N
34	Profesora Bravo	Docente de sociología y antropología cultural.	\N
35	Profesor Fuentes	Experto en circuitos eléctricos y electrónica.	\N
36	Profesora Carrasco	Especialista en literatura universal comparada.	\N
37	Profesor Vidal	Docente de contabilidad y auditoría.	\N
38	Profesora Pizarro	Experta en bioquímica y química analítica.	\N
39	Profesor Navarro	Especialista en ecuaciones diferenciales.	\N
40	Profesora Reyes	Docente de pedagogía teatral y expresión corporal.	\N
\.


--
-- TOC entry 5021 (class 0 OID 51795)
-- Dependencies: 229
-- Data for Name: teacherrating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teacherrating (ratingid, teachingpoliteness, teachingquality, teachingdifficulty, userid, teacherpageid) FROM stdin;
1	4.5	4.2	3.8	1	1
2	4.8	4.5	3.2	2	2
3	4.2	4	4.5	3	3
4	4.7	4.8	3.5	4	4
5	4.9	4.6	3	5	5
6	4.3	4.1	4.2	6	6
7	4.6	4.4	3.7	7	7
8	4.8	4.9	3.1	8	8
9	4.4	4.3	4	9	9
10	4.7	4.5	3.3	10	10
11	4.5	4.2	3.9	11	11
12	4.9	4.7	3.4	12	12
13	4.2	4.1	4.3	13	13
14	4.6	4.8	3.6	14	14
15	4.8	4.4	3.2	15	15
16	4.3	4	4.1	16	16
17	4.7	4.6	3.8	17	17
18	4.5	4.3	3.5	18	18
19	4.9	4.9	3	19	19
20	4.4	4.2	4.4	20	20
21	4.6	4.5	3.7	21	21
22	4.8	4.7	3.3	22	22
23	4.3	4.1	4.2	23	23
24	4.7	4.8	3.4	24	24
25	4.5	4.4	3.9	25	25
26	4.9	4.6	3.1	26	26
27	4.2	4	4.5	27	27
28	4.6	4.3	3.6	28	28
29	4.8	4.5	3.2	29	29
30	4.4	4.2	4	30	30
31	4.7	4.4	3.8	31	31
32	4.5	4.1	4.3	32	32
33	4.9	4.7	3.5	33	33
34	4.3	4	4.1	34	34
35	4.6	4.3	3.7	35	35
36	4.8	4.6	3.3	36	36
37	4.4	4.2	4.4	37	37
38	4.7	4.5	3.9	38	38
39	4.5	4.4	3.6	39	39
40	4.9	4.8	3.2	40	40
\.


--
-- TOC entry 5012 (class 0 OID 51719)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (userid, password, username, role, correo, rut, region, district, ismember, profilepicture) FROM stdin;
1	password1	juan_perez	1	juan.perez@email.com	12345678-9	Metropolitana	Santiago	t	\N
2	password2	maria_gonzalez	2	maria.gonzalez@email.com	23456789-0	Valparaíso	Viña del Mar	f	\N
3	password3	carlos_lopez	1	carlos.lopez@email.com	34567890-1	Metropolitana	Providencia	t	\N
4	password4	ana_martinez	3	ana.martinez@email.com	45678901-2	Biobío	Concepción	f	\N
5	password5	pedro_rodriguez	2	pedro.rodriguez@email.com	56789012-3	Maule	Talca	t	\N
6	password6	laura_silva	1	laura.silva@email.com	67890123-4	Araucanía	Temuco	f	\N
7	password7	miguel_torres	3	miguel.torres@email.com	78901234-5	Metropolitana	Las Condes	t	\N
8	password8	isabel_ruiz	2	isabel.ruiz@email.com	89012345-6	Valparaíso	Valparaíso	f	\N
9	password9	francisco_diaz	1	francisco.diaz@email.com	90123456-7	Metropolitana	Ñuñoa	t	\N
10	password10	carmen_vargas	3	carmen.vargas@email.com	01234567-8	Biobío	Chillán	f	\N
11	password11	roberto_mendoza	2	roberto.mendoza@email.com	11223344-5	Maule	Curicó	t	\N
12	password12	patricia_castro	1	patricia.castro@email.com	22334455-6	Araucanía	Villarrica	f	\N
13	password13	jorge_herrera	3	jorge.herrera@email.com	33445566-7	Metropolitana	La Reina	t	\N
14	password14	daniela_nunez	2	daniela.nunez@email.com	44556677-8	Valparaíso	Quilpué	f	\N
15	password15	fernando_ortiz	1	fernando.ortiz@email.com	55667788-9	Metropolitana	Macul	t	\N
16	password16	gabriela_rios	3	gabriela.rios@email.com	66778899-0	Biobío	Los Ángeles	f	\N
17	password17	ricardo_mora	2	ricardo.mora@email.com	77889900-1	Maule	Linares	t	\N
18	password18	monica_paredes	1	monica.paredes@email.com	88990011-2	Araucanía	Pucón	f	\N
19	password19	hugo_salazar	3	hugo.salazar@email.com	99001122-3	Metropolitana	Peñalolén	t	\N
20	password20	elena_cordero	2	elena.cordero@email.com	10111213-4	Valparaíso	Villa Alemana	f	\N
21	password21	arturo_figueroa	1	arturo.figueroa@email.com	11121314-5	Metropolitana	La Florida	t	\N
22	password22	veronica_leiva	3	veronica.leiva@email.com	12131415-6	Biobío	Coronel	f	\N
23	password23	sebastian_miranda	2	sebastian.miranda@email.com	13141516-7	Maule	San Javier	t	\N
24	password24	natalia_vega	1	natalia.vega@email.com	14151617-8	Araucanía	Angol	f	\N
25	password25	mauricio_guzman	3	mauricio.guzman@email.com	15161718-9	Metropolitana	Puente Alto	t	\N
26	password26	claudia_soto	2	claudia.soto@email.com	16171819-0	Valparaíso	Limache	f	\N
27	password27	rodrigo_campos	1	rodrigo.campos@email.com	17181920-1	Metropolitana	Maipú	t	\N
28	password28	paula_munoz	3	paula.munoz@email.com	18192021-2	Biobío	Tomé	f	\N
29	password29	felipe_contreras	2	felipe.contreras@email.com	19202122-3	Maule	Cauquenes	t	\N
30	password30	andrea_zuniga	1	andrea.zuniga@email.com	20212223-4	Araucanía	Lautaro	f	\N
31	password31	gustavo_tapia	3	gustavo.tapia@email.com	21222324-5	Metropolitana	San Bernardo	t	\N
32	password32	constanza_arias	2	constanza.arias@email.com	22232425-6	Valparaíso	Quillota	f	\N
33	password33	ernesto_pino	1	ernesto.pino@email.com	23242526-7	Metropolitana	Pudahuel	t	\N
34	password34	gloria_sepulveda	3	gloria.sepulveda@email.com	24252627-8	Biobío	Hualpén	f	\N
35	password35	hector_maldonado	2	hector.maldonado@email.com	25262728-9	Maule	Parral	t	\N
36	password36	sandra_bravo	1	sandra.bravo@email.com	26272829-0	Araucanía	Carahue	f	\N
37	password37	raul_fuentes	3	raul.fuentes@email.com	27282930-1	Metropolitana	Cerro Navia	t	\N
38	password38	lorena_carrasco	2	lorena.carrasco@email.com	28293031-2	Valparaíso	Casablanca	f	\N
39	password39	oscar_vidal	1	oscar.vidal@email.com	29303132-3	Metropolitana	La Granja	t	\N
40	password40	katherine_pizarro	3	katherine.pizarro@email.com	30313233-4	Biobío	San Pedro	f	\N
\.


--
-- TOC entry 5029 (class 0 OID 51874)
-- Dependencies: 237
-- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.votes (voteid, postid, userid, vote_type) FROM stdin;
\.


--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 232
-- Name: comment_commentid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_commentid_seq', 60, true);


--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 234
-- Name: comment_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_postid_seq', 1, false);


--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 233
-- Name: comment_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_userid_seq', 1, false);


--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 238
-- Name: commentvotes_voteid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.commentvotes_voteid_seq', 1, false);


--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 225
-- Name: educationalinstitution_eduid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.educationalinstitution_eduid_seq', 40, true);


--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 221
-- Name: post_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_postid_seq', 40, true);


--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 230
-- Name: review_reviewid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_reviewid_seq', 60, true);


--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 240
-- Name: reviewvotes_voteid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviewvotes_voteid_seq', 1, false);


--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 223
-- Name: teacherpage_teacherpageid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teacherpage_teacherpageid_seq', 40, true);


--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 228
-- Name: teacherrating_ratingid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teacherrating_ratingid_seq', 40, true);


--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userid_seq', 40, true);


--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 236
-- Name: votes_voteid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.votes_voteid_seq', 1, false);


--
-- TOC entry 4836 (class 2606 OID 51862)
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (commentid);


--
-- TOC entry 4842 (class 2606 OID 51908)
-- Name: commentvotes commentvotes_commentid_userid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commentvotes
    ADD CONSTRAINT commentvotes_commentid_userid_key UNIQUE (commentid, userid);


--
-- TOC entry 4844 (class 2606 OID 51906)
-- Name: commentvotes commentvotes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commentvotes
    ADD CONSTRAINT commentvotes_pkey PRIMARY KEY (voteid);


--
-- TOC entry 4828 (class 2606 OID 51776)
-- Name: educationalinstitution educationalinstitution_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educationalinstitution
    ADD CONSTRAINT educationalinstitution_pkey PRIMARY KEY (eduid);


--
-- TOC entry 4830 (class 2606 OID 51783)
-- Name: edutea edutea_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.edutea
    ADD CONSTRAINT edutea_pkey PRIMARY KEY (eduid, teacherpageid);


--
-- TOC entry 4824 (class 2606 OID 51747)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (postid);


--
-- TOC entry 4834 (class 2606 OID 51832)
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (reviewid);


--
-- TOC entry 4846 (class 2606 OID 51929)
-- Name: reviewvotes reviewvotes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviewvotes
    ADD CONSTRAINT reviewvotes_pkey PRIMARY KEY (voteid);


--
-- TOC entry 4848 (class 2606 OID 51931)
-- Name: reviewvotes reviewvotes_reviewid_userid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviewvotes
    ADD CONSTRAINT reviewvotes_reviewid_userid_key UNIQUE (reviewid, userid);


--
-- TOC entry 4826 (class 2606 OID 51764)
-- Name: teacherpage teacherpage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacherpage
    ADD CONSTRAINT teacherpage_pkey PRIMARY KEY (teacherpageid);


--
-- TOC entry 4832 (class 2606 OID 51806)
-- Name: teacherrating teacherrating_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacherrating
    ADD CONSTRAINT teacherrating_pkey PRIMARY KEY (ratingid);


--
-- TOC entry 4822 (class 2606 OID 51731)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 4838 (class 2606 OID 51883)
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (voteid);


--
-- TOC entry 4840 (class 2606 OID 51885)
-- Name: votes votes_postid_userid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_postid_userid_key UNIQUE (postid, userid);


--
-- TOC entry 4856 (class 2606 OID 51868)
-- Name: comment comment_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_postid_fkey FOREIGN KEY (postid) REFERENCES public.post(postid);


--
-- TOC entry 4857 (class 2606 OID 51863)
-- Name: comment comment_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- TOC entry 4860 (class 2606 OID 51909)
-- Name: commentvotes commentvotes_commentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commentvotes
    ADD CONSTRAINT commentvotes_commentid_fkey FOREIGN KEY (commentid) REFERENCES public.comment(commentid);


--
-- TOC entry 4861 (class 2606 OID 51914)
-- Name: commentvotes commentvotes_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commentvotes
    ADD CONSTRAINT commentvotes_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- TOC entry 4850 (class 2606 OID 51784)
-- Name: edutea edutea_eduid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.edutea
    ADD CONSTRAINT edutea_eduid_fkey FOREIGN KEY (eduid) REFERENCES public.educationalinstitution(eduid);


--
-- TOC entry 4851 (class 2606 OID 51789)
-- Name: edutea edutea_teacherpageid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.edutea
    ADD CONSTRAINT edutea_teacherpageid_fkey FOREIGN KEY (teacherpageid) REFERENCES public.teacherpage(teacherpageid);


--
-- TOC entry 4849 (class 2606 OID 51748)
-- Name: post post_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- TOC entry 4854 (class 2606 OID 51833)
-- Name: review review_teacherpageid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_teacherpageid_fkey FOREIGN KEY (teacherpageid) REFERENCES public.teacherpage(teacherpageid);


--
-- TOC entry 4855 (class 2606 OID 51838)
-- Name: review review_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- TOC entry 4862 (class 2606 OID 51932)
-- Name: reviewvotes reviewvotes_reviewid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviewvotes
    ADD CONSTRAINT reviewvotes_reviewid_fkey FOREIGN KEY (reviewid) REFERENCES public.review(reviewid);


--
-- TOC entry 4863 (class 2606 OID 51937)
-- Name: reviewvotes reviewvotes_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviewvotes
    ADD CONSTRAINT reviewvotes_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- TOC entry 4852 (class 2606 OID 51812)
-- Name: teacherrating teacherrating_teacherpageid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacherrating
    ADD CONSTRAINT teacherrating_teacherpageid_fkey FOREIGN KEY (teacherpageid) REFERENCES public.teacherpage(teacherpageid);


--
-- TOC entry 4853 (class 2606 OID 51807)
-- Name: teacherrating teacherrating_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacherrating
    ADD CONSTRAINT teacherrating_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- TOC entry 4858 (class 2606 OID 51886)
-- Name: votes votes_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_postid_fkey FOREIGN KEY (postid) REFERENCES public.post(postid);


--
-- TOC entry 4859 (class 2606 OID 51891)
-- Name: votes votes_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


-- Completed on 2025-11-01 18:24:13

--
-- PostgreSQL database dump complete
--

\unrestrict rZ6KfxAyfolmSCL2NuS97IDSLVuM3bRagZMR0Se4UxNBMzgwUzrwVc0U0sxxuJw

