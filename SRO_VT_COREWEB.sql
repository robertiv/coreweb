CREATE DATABASE [SRO_VT_COREWEB]
GO

USE [SRO_VT_COREWEB]
GO
/****** Object:  Table [dbo].[_Announcements]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_Announcements](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Author] [varchar](max) NULL,
	[Descr] [text] NULL,
	[Pinned] [int] NULL,
	[postDate] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_CharTriJob_GoodsLog]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_CharTriJob_GoodsLog](
	[CharID] [int] NULL,
	[JobType] [tinyint] NULL,
	[LinkedCharID] [int] NULL,
	[LinkedCharCount] [tinyint] NULL,
	[OwnerTown] [varchar](3) NULL,
	[SellTown] [varchar](3) NULL,
	[Quantity] [smallint] NULL,
	[GainedGold] [bigint] NULL,
	[GainedCoin] [real] NULL,
	[logDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_DiscordWidget]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_DiscordWidget](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Members] [int] NOT NULL,
	[Online] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_Emails]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_Emails](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[JID] [int] NULL,
	[Email] [varchar](max) NULL,
	[Verified] [tinyint] NULL,
	[lastLogin] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_GlobalLog]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_GlobalLog](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CharName16] [varchar](16) NOT NULL,
	[Message] [varchar](255) NOT NULL,
	[Date] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_HonorRank]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_HonorRank](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CharID] [int] NULL,
	[Points] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_ItemNames]    Script Date: 4/21/2026 12:40:56 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[_ItemNames](
	[CodeName128] [varchar](max) NULL,
	[TextString] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_RefMagicOptNew]    Script Date: 4/21/2026 12:41:12 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[_RefMagicOptNew](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[MOptName128] [varchar](max) NULL,
	[RealName] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_JobKillsLog]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_JobKillsLog](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[KillerID] [int] NULL,
	[KillerJob] [int] NULL,
	[DeadID] [int] NULL,
	[DeadJob] [int] NULL,
	[KillTime] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_OnlineOffline]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_OnlineOffline](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CharID] [int] NULL,
	[loginDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_PvPRankLogs]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_PvPRankLogs](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[WinnerID] [int] NULL,
	[LoserID] [int] NULL,
	[PvpDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_SiegeWinner]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_SiegeWinner](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FortressID] [int] NULL,
	[GuildID] [int] NULL,
	[winDate] [datetime] NULL,
	[winCount] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_UniquesLog]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_UniquesLog](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CharID] [int] NOT NULL,
	[UniqueCode] [varchar](max) NOT NULL,
	[killDate] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_uniquesName]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_uniquesName](
	[mobCode] [varchar](64) NULL,
	[mobName] [varchar](64) NULL,
	[ID] [int] IDENTITY(1,1) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_UniquesPoints]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_UniquesPoints](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[RefUniqueID] [int] NULL,
	[RefUniqueCode] [varchar](max) NULL,
	[Points] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[_UniquesRank]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_UniquesRank](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CharID] [int] NULL,
	[Points] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[_CreateAccount]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[_CreateAccount]
	@StrUserID	VARCHAR(max),
	@Email		VARCHAR(max),
	@Password	VARCHAR(max)
AS

	INSERT INTO SRO_VT_ACCOUNT.dbo.TB_User (StrUserID, Email, certificate_num, regtime, [password])
	VALUES (@StrUserID, @Email, 0, GETDATE(), @Password)

	DECLARE @NuevoID INT;
	SET @NuevoID = SCOPE_IDENTITY();

	INSERT INTO _Emails values (@NuevoID, @Email, 0, GETDATE())
GO
/****** Object:  StoredProcedure [dbo].[_GetCharInventoryData]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[_GetCharInventoryData]

	@Charname varchar(max)

as

SELECT 

chart.CharID,-->1<--
chart.CharName16,-->2<--
chart.RefObjID,-->3<--
chart.CurLevel,
invent0.Slot as Slot,-->4<--
CASE
	--WHEN ref0.CodeName128 like 'DUMMY_OBJECT' THEN NULL
	WHEN invent0.Slot = 0 THEN 'Head'
	WHEN invent0.Slot = 1 THEN 'Chest'
	WHEN invent0.Slot = 2 THEN 'Shoulders'
	WHEN invent0.Slot = 3 THEN 'Hands'
	WHEN invent0.Slot = 4 THEN 'Legs'
	WHEN invent0.Slot = 5 THEN 'Shoes'
	WHEN invent0.Slot = 6 THEN 'Weapon'
	WHEN invent0.Slot = 7 THEN 'Shield/Arrow'
	WHEN invent0.Slot = 9 THEN 'Earring'
	WHEN invent0.Slot = 10 THEN 'Necklace'
	WHEN invent0.Slot = 11 THEN 'Ring'
	WHEN invent0.Slot = 12 THEN 'Ring'
	ELSE 'NO clue' 
END as 'ItemType',-->5<--
Name = es.TextString,
SealType = 
CASE
	WHEN PATINDEX('%_11%_' + '%A_RARE%',ref0.CodeName128) > 0 THEN 'Seal of Nova'
	WHEN PATINDEX('%_11%_' + '%SET_B_RARE%',ref0.CodeName128) > 0 THEN 'Seal of Nova'
	WHEN PATINDEX('%_11%_' + '%SET_A_RARE%',ref0.CodeName128) > 0 THEN 'Seal of Nova'
	WHEN PATINDEX('%A_RARE%',ref0.CodeName128) > 0 THEN 'Seal of Star'
	WHEN PATINDEX('%B_RARE%',ref0.CodeName128) > 0 THEN 'Seal of Moon'
	WHEN PATINDEX('%C_RARE%',ref0.CodeName128) > 0 THEN 'Seal of Sun'
	WHEN PATINDEX('%D_RARE%',ref0.CodeName128) > 0 THEN 'Seal of Sun'
	WHEN PATINDEX('%E_RARE%',ref0.CodeName128) > 0 THEN 'Seal of Sun'
	ELSE 'Normal' 
END,
ClothType = 
CASE
	WHEN PATINDEX('%_CH_%' + '%_CLOTHES_%',ref0.CodeName128) > 0 THEN 'Garment'
	WHEN PATINDEX('%_CH_%' + '%_LIGHT_%',ref0.CodeName128) > 0 THEN 'Protector'
	WHEN PATINDEX('%_CH_%' + '%_HEAVY_%',ref0.CodeName128) > 0 THEN 'Armor'	
	WHEN PATINDEX('%_EU_%' + '%_CLOTHES_%',ref0.CodeName128) > 0 THEN 'Robe'
	WHEN PATINDEX('%_EU_%' + '%_LIGHT_%',ref0.CodeName128) > 0 THEN 'Light Armor'
	WHEN PATINDEX('%_EU_%' + '%_HEAVY_%',ref0.CodeName128) > 0 THEN 'Heavy Armor'	
	WHEN PATINDEX('%_SHIELD_%',ref0.CodeName128) > 0 THEN 'Shield'
	WHEN PATINDEX('%_AMMO_%',ref0.CodeName128) > 0 THEN 'Arrows/Bolts'	
	WHEN PATINDEX('%QUIVER%',ref0.CodeName128) > 0 THEN 'Arrows/Bolts'
	WHEN PATINDEX('%_CH%' + '%_BLADE_%',ref0.CodeName128) > 0 THEN 'Blade'	
	WHEN PATINDEX('%_CH%' + '%SWOR%',ref0.CodeName128) > 0 THEN 'Sword'	
	WHEN PATINDEX('%_CH%' + '%BOW%',ref0.CodeName128) > 0 THEN 'Bow'	
	WHEN PATINDEX('%_CH%' + '%SPEAR%',ref0.CodeName128) > 0 THEN 'Spear'	
	WHEN PATINDEX('%_CH%' + '%TBLADE%',ref0.CodeName128) > 0 THEN 'Glaive'	
	WHEN PATINDEX('%_CH%' + '%BLADE_%',ref0.CodeName128) > 0 THEN 'Blade'	
	WHEN PATINDEX('%_CH%' + '%BLADE_%',ref0.CodeName128) > 0 THEN 'Blade'	
	WHEN PATINDEX('%_EU%' + '%_SWORD%',ref0.CodeName128) > 0 THEN 'Onehand sword'	
	WHEN PATINDEX('%_EU%' + '%TSWORD%',ref0.CodeName128) > 0 THEN 'Twohand sword'	
	WHEN PATINDEX('%_EU%' + '%AXE%',ref0.CodeName128) > 0 THEN 'Axe'	
	WHEN PATINDEX('%_EU%' + '%DARKSTAFF%',ref0.CodeName128) > 0 THEN 'Dark staff'	
	WHEN PATINDEX('%_EU%' + '%TSTAFF%',ref0.CodeName128) > 0 THEN 'Twohand staff'	
	WHEN PATINDEX('%_EU%' + '%CROSSBOW%',ref0.CodeName128) > 0 THEN 'Crossbow'	
	WHEN PATINDEX('%_EU%' + '%DAGGER%',ref0.CodeName128) > 0 THEN 'Dagger'	
	WHEN PATINDEX('%_EU%' + '%HARP%',ref0.CodeName128) > 0 THEN 'Harp'	
	WHEN PATINDEX('%_EU%' + '%STAFF%',ref0.CodeName128) > 0 THEN 'Light staff'	
	WHEN PATINDEX('%_EARRING_%',ref0.CodeName128) > 0 THEN 'Earring'
	WHEN PATINDEX('%_RING_%',ref0.CodeName128) > 0 THEN 'Ring'
	WHEN PATINDEX('%_NECKLACE_%',ref0.CodeName128) > 0 THEN 'Necklace'
	
	ELSE 'NA' 
END,
Seal = 
CASE
	WHEN PATINDEX('%RARE%',ref0.CodeName128) > 0 THEN 1
	ELSE 0 
END,
CASE WHEN ref0.CodeName128 like 'DUMMY_OBJECT' THEN NULL ELSE ref0.CodeName128 END as 'ItemCode',-->7<--

refi.PAttackMin_L as 'phyMin',
refi.PAttackMin_U as 'phyMin_u',
refi.PAttackMax_L as 'phyMax',
refi.PAttackMax_U as 'phyMax_u',
refi.PAttackInc as 'phyInc',
refi.MAttackMin_L as 'magMin',
refi.MAttackMin_U as 'magMin_u',
refi.MAttackMax_L as 'magMax',
refi.MAttackMax_U as 'magMax_u',
refi.MAttackInc as 'magInc',
refi.Dur_L as 'dura',
refi.Range as 'Range',
refi.HR_L as 'atkRate',
refi.CHR_L as 'Critical',
refi.CHR_U as 'CriticalMax',
refi.PAStrMin_L as 'phyReinforceMin',
refi.PAStrMin_U as 'phyReinforceMin_u',
refi.PAStrMax_L as 'phyReinforceMax',
refi.PAStrMax_U as 'phyReinforceMax_u',
refi.MAInt_Min_L as 'magReinforceMin',
refi.MAInt_Max_L as 'magReinforceMax',
refi.MAInt_Min_U as 'magReinforceMin_u',
refi.MAInt_Max_U as 'magReinforceMax_u',
refi.MaxMagicOptCount as 'maxOpt',
CEILING(refi.ItemClass / 3.0) as 'Degree',
refi.PD_L as 'PhyDef',
refi.PD_U as 'PhyDef_u',
refi.PDInc as 'PhyDefInc',
refi.MD_L as 'MagDef',
refi.MD_U as 'MagDef_u',
refi.MDInc as 'MagDefInc',
refi.ER_L as 'Parry',
refi.ER_U as 'Parry_u',
refi.PDStr_L as 'PhyReinf',
refi.MDInt_L as 'MagReinf',
refi.PDStr_U as 'PhyReinf_u',
refi.MDInt_U as 'MagReinf_u',
refi.BR_L as 'Blocking',
refi.BR_U as 'Blocking_u',
refi.PAR_L AS 'PhyAbs',
refi.PAR_U AS 'PhyAbs_u',
refi.PARInc AS 'PhyAbsInc',
refi.MAR_L AS 'MagAbs',
refi.MAR_U AS 'MagAbs_u',
refi.MARInc AS 'MagAbsInc',
items0.[Data] AS 'Quantity',
CASE WHEN refi.ReqGender = 1 THEN 'Male' WHEN refi.ReqGender = 2 THEN 'Universal' ELSE LTRIM(STR(ReqGender)) END AS 'Gender',
CASE 
WHEN CHARINDEX('_EU_',ref0.CodeName128) > 0 THEN 'European'
WHEN CHARINDEX('_CH_',ref0.CodeName128) > 0 THEN 'Chinese'
ELSE 'Universal' 
END as 'ItemOrigin',-->8<--
CASE WHEN ref0.CodeName128 like 'DUMMY_OBJECT' THEN 0 ELSE ref0.ID END as 'ItemID',-->9<--
REPLACE(ref0.AssocFileIcon128, 'ddj', 'bmp') as imgDir,
CASE WHEN ref0.CodeName128 like 'DUMMY_OBJECT' THEN 0 ELSE items0.ID64 END as 'ID64',-->10<--
CASE WHEN ref0.CodeName128 like 'DUMMY_OBJECT' THEN 0 ELSE CAST(ref0.ReqLevel1 as varchar(5)) END as 'ItemLevel',-->11<--
items0.OptLevel as 'Item',-->12<--
'AdvE' = 
CASE 
	WHEN not exists(SELECT nOptValue FROM SRO_VT_SHARD.dbo._BindingOptionWithItem WHERE nItemDBID = items0.ID64) THEN 0 
	ELSE bind.nOptValue 
END,-->13<--
items0.MagParamNum as 'MagParamNum',
magic1.RealName as 'MagName1',-->14<--
CASE WHEN items0.MagParam1 != 0 AND items0.MagParamNum != 0 THEN CAST(items0.MagParam1 / 4294967296 as int) ELSE NULL END as 'MagValue1',-->15<--

magic2.RealName as 'MagName2',-->16<--
CASE WHEN items0.MagParam2 != 0 AND items0.MagParamNum != 0 THEN CAST(items0.MagParam2 / 4294967296 as int) ELSE NULL END as 'MagValue2',-->17<--

magic3.RealName as 'MagName3',-->18<--
CASE WHEN items0.MagParam3 != 0 AND items0.MagParamNum != 0 THEN CAST(items0.MagParam3 / 4294967296 as int) ELSE NULL END as 'MagValue3',-->19<--

magic4.RealName as 'MagName4',-->20<--
CASE WHEN items0.MagParam4 != 0 AND items0.MagParamNum != 0 THEN CAST(items0.MagParam4 / 4294967296 as int) ELSE NULL END as 'MagValue4',-->21<--

magic5.RealName as 'MagName5',-->22<--
CASE WHEN items0.MagParam5 != 0 AND items0.MagParamNum != 0 THEN CAST(items0.MagParam5 / 4294967296 as int) ELSE NULL END as 'MagValue5',-->23<--

magic6.RealName as 'MagName6',-->24<--
CASE WHEN items0.MagParam6 != 0 AND items0.MagParamNum != 0 THEN CAST(items0.MagParam6 / 4294967296 as int) ELSE NULL END as 'MagValue6',-->25<--

magic7.RealName as 'MagName7',-->26<--
CASE WHEN items0.MagParam7 != 0 AND items0.MagParamNum != 0 THEN CAST(items0.MagParam7 / 4294967296 as int) ELSE NULL END as 'MagValue7',-->27<--

magic8.RealName as 'MagName8',-->28<--
CASE WHEN items0.MagParam8 != 0 AND items0.MagParamNum != 0 THEN CAST(items0.MagParam8 / 4294967296 as int) ELSE NULL END as 'MagValue8',-->29<--

magic9.RealName as 'MagName9',-->30<--
CASE WHEN items0.MagParam9 != 0 AND items0.MagParamNum != 0 THEN CAST(items0.MagParam9 / 4294967296 as int) ELSE NULL END as 'MagValue9',-->31<--

magic10.RealName as 'MagName10',-->32<--
CASE WHEN items0.MagParam10 != 0 AND items0.MagParamNum != 0 THEN CAST(items0.MagParam10 / 4294967296 as int) ELSE NULL END as 'MagValue10',-->33<--

magic11.RealName as 'MagName11',-->34<--
CASE WHEN items0.MagParam11 != 0 AND items0.MagParamNum != 0 THEN CAST(items0.MagParam11 / 4294967296 as int) ELSE NULL END as 'MagValue11',-->35<--

magic12.RealName as 'MagName12',-->36<--
CASE WHEN items0.MagParam12 != 0 AND items0.MagParamNum != 0 THEN CAST(items0.MagParam12 / 4294967296 as int) ELSE NULL END as 'MagValue12', -->37<--

items0.Variance as wstats
FROM SRO_VT_SHARD.dbo._Inventory as invent0
JOIN SRO_VT_SHARD.dbo._Items as items0 on invent0.ItemID = items0.ID64 AND ((invent0.Slot BETWEEN 0 AND 12) AND invent0.Slot != 8)
JOIN SRO_VT_SHARD.dbo._RefObjCommon as ref0 on items0.RefItemID = ref0.ID
JOIN SRO_VT_SHARD.dbo._Char as chart on invent0.CharID = chart.CharID
LEFT JOIN SRO_VT_SHARD.dbo._BindingOptionWithItem as bind on items0.ID64 = bind.nItemDBID AND bind.bOptType = 2
LEFT JOIN SRO_VT_COREWEB.dbo._ItemNames as es on ref0.NameStrID128 = es.CodeName128
LEFT JOIN SRO_VT_COREWEB.dbo._RefMagicOptNew as magic1 on (items0.MagParam1 & 2147483647) = magic1.ID
LEFT JOIN SRO_VT_COREWEB.dbo._RefMagicOptNew as magic2 on (items0.MagParam2 & 2147483647) = magic2.ID
LEFT JOIN SRO_VT_COREWEB.dbo._RefMagicOptNew as magic3 on (items0.MagParam3 & 2147483647) = magic3.ID
LEFT JOIN SRO_VT_COREWEB.dbo._RefMagicOptNew as magic4 on (items0.MagParam4 & 2147483647) = magic4.ID
LEFT JOIN SRO_VT_COREWEB.dbo._RefMagicOptNew as magic5 on (items0.MagParam5 & 2147483647) = magic5.ID
LEFT JOIN SRO_VT_COREWEB.dbo._RefMagicOptNew as magic6 on (items0.MagParam6 & 2147483647) = magic6.ID
LEFT JOIN SRO_VT_COREWEB.dbo._RefMagicOptNew as magic7 on (items0.MagParam7 & 2147483647) = magic7.ID
LEFT JOIN SRO_VT_COREWEB.dbo._RefMagicOptNew as magic8 on (items0.MagParam8 & 2147483647) = magic8.ID
LEFT JOIN SRO_VT_COREWEB.dbo._RefMagicOptNew as magic9 on (items0.MagParam9 & 2147483647) = magic9.ID
LEFT JOIN SRO_VT_COREWEB.dbo._RefMagicOptNew as magic10 on (items0.MagParam10 & 2147483647) = magic10.ID
LEFT JOIN SRO_VT_COREWEB.dbo._RefMagicOptNew as magic11 on (items0.MagParam11 & 2147483647) = magic11.ID
LEFT JOIN SRO_VT_COREWEB.dbo._RefMagicOptNew as magic12 on (items0.MagParam12 & 2147483647) = magic12.ID
LEFT JOIN SRO_VT_SHARD.dbo._RefObjItem as refi on ref0.Link = refi.ID

WHERE chart.CharName16 = @Charname

GROUP BY chart.CharID, chart.CharName16, chart.CurLevel, invent0.Slot, ref0.CodeName128, ref0.AssocFileIcon128,
es.TextString, items0.OptLevel, ref0.ReqLevel1, bind.nOptValue, items0.ID64, ref0.ID, refi.PAttackMin_L, refi.PAttackMin_U, refi.PAttackMax_U, refi.PAttackInc, 
refi.MAttackInc, refi.PAttackMax_L, refi.MAInt_Max_U, refi.MAInt_Min_U, refi.PD_U, refi.MD_U,refi.ER_U,refi.PDStr_U,refi.MDInt_U,
refi.MAttackMin_L, refi.MAttackMin_U, refi.MAttackMax_U, refi.MAttackMax_L, refi.Dur_L, refi.Range, refi.HR_L, refi.CHR_L,refi.CHR_U, 
refi.PAStrMin_L, refi.PAStrMin_U, refi.PAStrMax_U, refi.PAStrMax_L, refi.MAInt_Min_L, refi.MAInt_Max_L, refi.MaxMagicOptCount, refi.ItemClass, refi.PD_L, 
refi.PDInc, refi.MD_L, refi.MDInc, refi.MDInt_L, refi.PDStr_L, refi.ER_L, refi.ReqGender,refi.BR_L,refi.BR_U,refi.PAR_L,refi.PAR_U,refi.PARInc,refi.MARInc,refi.MAR_L,refi.MAR_U,items0.[Data],
chart.RefObjID,items0.MagParam1,items0.MagParam2,items0.MagParam3,items0.MagParam4,items0.MagParam5,items0.MagParam6,items0.MagParam7,
items0.MagParam8,items0.MagParam9,items0.MagParam10,items0.MagParam11,items0.MagParam12, items0.MagParamNum, items0.Variance, magic1.RealName, magic2.RealName,
magic3.RealName,magic4.RealName,magic5.RealName,magic6.RealName,magic7.RealName,magic8.RealName,magic9.RealName,magic10.RealName,
magic11.RealName,magic12.RealName
ORDER BY chart.CharName16 asc, invent0.Slot asc;
GO
/****** Object:  StoredProcedure [dbo].[_ManageCharActions]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[_ManageCharActions] 
	@CharID		int,
	@EventID		tinyint,
	@Data1		int,
	@Data2		int,
	@strPos		varchar(64),
	@Desc		varchar(128)
as
	
	IF(@EventID = 6)
	BEGIN
		IF(NOT EXISTS(SELECT 1 FROM _OnlineOffline WHERE CharID = @CharID))
			INSERT INTO _OnlineOffline VALUES (@CharID, GETDATE())
	END

	IF(@EventID = 4)
	BEGIN
		IF(EXISTS(SELECT 1 FROM _OnlineOffline WHERE CharID = @CharID))
			DELETE FROM _OnlineOffline WHERE CharID = @CharID
	END
	
GO
/****** Object:  StoredProcedure [dbo].[_UpdateEmail]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[_UpdateEmail]
	@JID	VARCHAR(max),
	@newEmail		VARCHAR(max)	
AS

	UPDATE SRO_VT_ACCOUNT.dbo.TB_User SET Email = @newEmail WHERE JID = @JID
	UPDATE SRO_VT_COREWEB.dbo._Emails SET Email = @newEmail, Verified = 0 WHERE JID = @JID
GO
/****** Object:  StoredProcedure [dbo].[_UpdatePassword]    Script Date: 22/03/2026 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[_UpdatePassword]
	@JID	VARCHAR(max),
	@newPassword		VARCHAR(max)	
AS

	UPDATE SRO_VT_ACCOUNT.dbo.TB_User SET password = @newPassword WHERE JID = @JID
GO
