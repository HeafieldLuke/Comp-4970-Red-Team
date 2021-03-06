﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SWEBackend.Data;

namespace SWEBackend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("SWEBackend.Models.Room", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Capacity")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<Guid?>("VenueId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("VenueId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("SWEBackend.Models.SWEFile", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<byte[]>("ByteData")
                        .HasColumnType("bytea");

                    b.HasKey("Id");

                    b.ToTable("SWEFile");
                });

            modelBuilder.Entity("SWEBackend.Models.Session", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<Guid>("RoomId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("SpeakerId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("TimeSlotId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.HasIndex("SpeakerId");

                    b.HasIndex("TimeSlotId");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("SWEBackend.Models.SessionCount", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Count")
                        .HasColumnType("integer");

                    b.Property<Guid>("SessionId")
                        .HasColumnType("uuid");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SessionId");

                    b.ToTable("SessionCounts");
                });

            modelBuilder.Entity("SWEBackend.Models.Speaker", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<Guid?>("SpeakerPhotoId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("SpeakerPhotoId");

                    b.ToTable("Speakers");
                });

            modelBuilder.Entity("SWEBackend.Models.TimeSlot", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("TimeSlots");
                });

            modelBuilder.Entity("SWEBackend.Models.Venue", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Venues");
                });

            modelBuilder.Entity("SWEBackend.Models.Room", b =>
                {
                    b.HasOne("SWEBackend.Models.Venue", "Venue")
                        .WithMany("Rooms")
                        .HasForeignKey("VenueId");

                    b.Navigation("Venue");
                });

            modelBuilder.Entity("SWEBackend.Models.Session", b =>
                {
                    b.HasOne("SWEBackend.Models.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SWEBackend.Models.Speaker", "Speaker")
                        .WithMany("Sessions")
                        .HasForeignKey("SpeakerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SWEBackend.Models.TimeSlot", "TimeSlot")
                        .WithMany("Sessions")
                        .HasForeignKey("TimeSlotId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("Speaker");

                    b.Navigation("TimeSlot");
                });

            modelBuilder.Entity("SWEBackend.Models.SessionCount", b =>
                {
                    b.HasOne("SWEBackend.Models.Session", "Session")
                        .WithMany("SessionCounts")
                        .HasForeignKey("SessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Session");
                });

            modelBuilder.Entity("SWEBackend.Models.Speaker", b =>
                {
                    b.HasOne("SWEBackend.Models.SWEFile", "SpeakerPhoto")
                        .WithMany("Speakers")
                        .HasForeignKey("SpeakerPhotoId");

                    b.Navigation("SpeakerPhoto");
                });

            modelBuilder.Entity("SWEBackend.Models.SWEFile", b =>
                {
                    b.Navigation("Speakers");
                });

            modelBuilder.Entity("SWEBackend.Models.Session", b =>
                {
                    b.Navigation("SessionCounts");
                });

            modelBuilder.Entity("SWEBackend.Models.Speaker", b =>
                {
                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("SWEBackend.Models.TimeSlot", b =>
                {
                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("SWEBackend.Models.Venue", b =>
                {
                    b.Navigation("Rooms");
                });
#pragma warning restore 612, 618
        }
    }
}
